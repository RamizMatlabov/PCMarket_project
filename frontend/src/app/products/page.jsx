'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import { Search, Filter, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../../components/Footer';
import { useCart } from '@/context/CartContext';
import AddToCartModal from '../../components/modals/AddToCartModal';
import AuthRequiredModal from '../../components/modals/AuthRequiredModal';
import { GlareCard } from '../../components/animations/CardHover';
import { TextReveal } from '../../components/animations/TextReveal';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

function URLParamsSync({ onType, onSearch }) {
  const sp = useSearchParams();
  useEffect(() => {
    const type = sp.get('type');
    if (type) {
      onType(type);
    }
    const search = sp.get('search');
    if (search) {
      onSearch(search);
    }
  }, [sp, onType, onSearch]);
  return null;
}

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [sortBy, setSortBy] = useState('-created_at');
  const { addToCart, showAuthModal, authModalAction, closeAuthModal } = useCart();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, selectedType, sortBy, searchTerm]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let url = API_BASE_URL + '/api/products/products/';
      const params = new URLSearchParams();
      
      // Когда выбраны "Все категории", увеличиваем размер страницы чтобы получить все товары
      if (!selectedCategory) {
        params.append('page_size', '1000'); // Большое число для получения всех товаров
      }
      
      if (selectedCategory) params.append('category', selectedCategory);
      if (selectedType) params.append('product_type', selectedType);
      if (searchTerm) params.append('search', searchTerm);
      if (sortBy) params.append('ordering', sortBy);
      
      if (params.toString()) {
        url += '?' + params.toString();
      }
      
      const response = await fetch(url);
      const data = await response.json();
      
      // Обрабатываем пагинацию: если есть results, используем их, иначе весь массив
      if (data.results) {
        setProducts(data.results);
      } else if (Array.isArray(data)) {
        setProducts(data);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(API_BASE_URL + '/api/products/categories/');
      const data = await response.json();
      setCategories(data.results || data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleAddToCart = (product) => {
    if (addToCart(product)) {
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 2000);
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedType('');
    setSortBy('-created_at');
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Suspense fallback={null}>
        <URLParamsSync onType={setSelectedType} onSearch={setSearchTerm} />
      </Suspense>
      <AddToCartModal show={showModal} onClose={closeModal} />
      <AuthRequiredModal show={showAuthModal} onClose={closeAuthModal} action={authModalAction} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8">
          {/* Sidebar Filters */}
          <motion.div
            className="lg:w-1/4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="bg-slate-800 rounded-lg p-4 sm:p-5 md:p-6 lg:sticky lg:top-8"
              whileHover={{ boxShadow: '0 10px 40px rgba(59, 130, 246, 0.2)' }}
              transition={{ duration: 0.3 }}
            >
              <motion.h3
                className="text-lg font-semibold mb-4 flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Filter className="h-5 w-5 mr-2" />
                </motion.div>
                Фильтры
              </motion.h3>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Поиск</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Название товара..."
                    className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Категория</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Все категории</option>
                  {Array.isArray(categories) && categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name} ({category.product_count})
                    </option>
                  ))}
                </select>
              </div>

              {/* Product Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Тип товара</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Все типы</option>
                  <option value="computer">Компьютеры</option>
                  <option value="all-in-one">Моноблоки</option>
                  <option value="component">Комплектующие</option>
                  <option value="accessory">Аксессуары</option>
                  <option value="other">Другое</option>
                </select>
              </div>

              {/* Sort */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Сортировка</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="-created_at">По дате добавления (новые сначала)</option>
                  <option value="created_at">По дате добавления (старые сначала)</option>
                  <option value="price">По цене (возрастание)</option>
                  <option value="-price">По цене (убывание)</option>
                  <option value="name">По названию</option>
                </select>
              </div>

              <motion.button
                onClick={clearFilters}
                className="w-full py-2 px-4 bg-slate-600 hover:bg-slate-500 text-white rounded-lg transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Сбросить фильтры
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Products Grid */}
          <motion.div
            className="lg:w-3/4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <TextReveal>
              <div className="mb-4 sm:mb-5 md:mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">Каталог товаров</h1>
                <motion.p
                  className="text-slate-300 text-sm sm:text-base"
                  key={products.length}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  Найдено товаров: {products.length}
                </motion.p>
              </div>
            </TextReveal>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-slate-800 rounded-lg p-6 animate-pulse">
                    <div className="bg-slate-700 h-48 rounded-lg mb-4"></div>
                    <div className="bg-slate-700 h-4 rounded mb-2"></div>
                    <div className="bg-slate-700 h-4 rounded w-3/4 mb-4"></div>
                    <div className="bg-slate-700 h-6 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : products.length > 0 ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedCategory + selectedType + sortBy + searchTerm}
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.08,
                      },
                    },
                    exit: {
                      transition: {
                        staggerChildren: 0.05,
                        staggerDirection: -1,
                      },
                    },
                  }}
                >
                  {products.map((product) => (
                    <motion.div
                      key={product.id}
                      variants={{
                        hidden: { opacity: 0, y: 20, scale: 0.9 },
                        visible: { opacity: 1, y: 0, scale: 1 },
                        exit: { opacity: 0, scale: 0.9 },
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      <GlareCard className="bg-slate-800 rounded-lg overflow-hidden h-full flex flex-col">
                        <Link href={`/products/${product.slug}`}>
                          <motion.div
                            className="aspect-w-16 aspect-h-9 bg-slate-700 relative overflow-hidden"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                          >
                            {product.image_url ? (
                              <Image
                                src={product.image_url}
                                alt={product.name}
                                width={300}
                                height={200}
                                className="w-full h-40 sm:h-44 md:h-48 object-cover"
                              />
                            ) : (
                              <div className="w-full h-40 sm:h-44 md:h-48 bg-slate-700 flex items-center justify-center">
                                <span className="text-slate-400 text-xs sm:text-sm">Нет изображения</span>
                              </div>
                            )}
                          </motion.div>
                        </Link>
                        <div className="p-4 sm:p-5 md:p-6 flex-1 flex flex-col">
                          <div className="flex items-center justify-between mb-2 flex-wrap gap-1 sm:gap-2">
                            <motion.span
                              className="text-xs bg-blue-600 text-white px-2 py-1 rounded"
                              whileHover={{ scale: 1.1 }}
                            >
                              {product.product_type === 'computer' ? 'Компьютер' : 
                               product.product_type === 'all-in-one' ? 'Моноблок' :
                               product.product_type === 'component' ? 'Комплектующее' : 
                               product.product_type === 'accessory' ? 'Аксессуар' : 'Другое'}
                            </motion.span>
                            <span className="text-xs text-slate-400">{product.category.name}</span>
                          </div>
                          <Link href={`/products/${product.slug}`} className="hover:underline">
                            <h3 className="text-base sm:text-lg font-semibold mb-2 line-clamp-2">{product.name}</h3>
                          </Link>
                          <p className="text-slate-400 text-xs sm:text-sm mb-2 sm:mb-3">{product.brand} {product.model}</p>
                          <div className="flex items-center justify-between mb-3 sm:mb-4">
                            <motion.span
                              className="text-lg sm:text-xl md:text-2xl font-bold text-blue-400"
                              whileHover={{ scale: 1.1 }}
                            >
                              {product.price} USD
                            </motion.span>
                            <div className="flex items-center text-yellow-400">
                              <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-current" />
                              <span className="ml-1 text-xs sm:text-sm">4.8</span>
                            </div>
                          </div>
                          <motion.button
                            onClick={() => handleAddToCart(product)}
                            disabled={!product.is_in_stock}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`w-full py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg font-semibold transition-colors text-sm sm:text-base ${
                              product.is_in_stock
                                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                : 'bg-slate-500 text-slate-300 cursor-not-allowed'
                            }`}
                          >
                            {product.is_in_stock ? 'В корзину' : 'Нет в наличии'}
                          </motion.button>
                        </div>
                      </GlareCard>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            ) : (
              <motion.div
                className="text-center py-8 sm:py-10 md:py-12 px-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="bg-slate-800 rounded-lg p-6 sm:p-8"
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                  >
                    <Search className="h-12 w-12 sm:h-16 sm:w-16 text-slate-400 mx-auto mb-3 sm:mb-4" />
                  </motion.div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">Товары не найдены</h3>
                  <p className="text-slate-300 mb-4 text-sm sm:text-base">
                    Попробуйте изменить параметры поиска или фильтры
                  </p>
                  <motion.button
                    onClick={clearFilters}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 sm:px-6 py-2 rounded-lg transition-colors text-sm sm:text-base"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Сбросить фильтры
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
