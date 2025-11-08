'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import { Search, Filter, Star } from 'lucide-react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import { useCart } from '@/context/CartContext';
import AddToCartModal from '../../components/modals/AddToCartModal';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const { addToCart } = useCart();
  const searchParams = useSearchParams();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    
    // Get filters from URL params
    const type = searchParams.get('type');
    if (type) {
      setSelectedType(type);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, selectedType, sortBy, searchTerm]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let url = 'http://localhost:8000/api/products/products/';
      const params = new URLSearchParams();
      
      if (selectedCategory) params.append('category', selectedCategory);
      if (selectedType) params.append('product_type', selectedType);
      if (searchTerm) params.append('search', searchTerm);
      if (sortBy) params.append('ordering', sortBy);
      
      if (params.toString()) {
        url += '?' + params.toString();
      }
      
      const response = await fetch(url);
      const data = await response.json();
      setProducts(data.results || data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/products/categories/');
      const data = await response.json();
      setCategories(data.results || data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
    }, 2000);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedType('');
    setSortBy('created_at');
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <Navigation />
      <AddToCartModal show={showModal} onClose={closeModal} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <div className="bg-slate-800 rounded-lg p-4 sm:p-5 md:p-6 lg:sticky lg:top-8">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Фильтры
              </h3>

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
                  <option value="component">Комплектующие</option>
                  <option value="accessory">Аксессуары</option>
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
                  <option value="created_at">По дате добавления</option>
                  <option value="price">По цене (возрастание)</option>
                  <option value="-price">По цене (убывание)</option>
                  <option value="name">По названию</option>
                </select>
              </div>

              <button
                onClick={clearFilters}
                className="w-full py-2 px-4 bg-slate-600 hover:bg-slate-500 text-white rounded-lg transition-colors"
              >
                Сбросить фильтры
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            <div className="mb-4 sm:mb-5 md:mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">Каталог товаров</h1>
              <p className="text-slate-300 text-sm sm:text-base">
                Найдено товаров: {products.length}
              </p>
            </div>

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
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                {products.map((product) => (
                  <div key={product.id} className="bg-slate-800 rounded-lg overflow-hidden hover:bg-slate-700 transition-colors">
                    <div className="aspect-w-16 aspect-h-9 bg-slate-700">
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
                    </div>
                    <div className="p-4 sm:p-5 md:p-6">
                      <div className="flex items-center justify-between mb-2 flex-wrap gap-1 sm:gap-2">
                        <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">
                          {product.product_type === 'computer' ? 'Компьютер' : 
                           product.product_type === 'component' ? 'Комплектующее' : 'Аксессуар'}
                        </span>
                        <span className="text-xs text-slate-400">{product.category.name}</span>
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold mb-2 line-clamp-2">{product.name}</h3>
                      <p className="text-slate-400 text-xs sm:text-sm mb-2 sm:mb-3">{product.brand} {product.model}</p>
                      <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <span className="text-lg sm:text-xl md:text-2xl font-bold text-blue-400">
                          {product.price} USD
                        </span>
                        <div className="flex items-center text-yellow-400">
                          <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-current" />
                          <span className="ml-1 text-xs sm:text-sm">4.8</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={!product.is_in_stock}
                        className={`w-full py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg font-semibold transition-colors text-sm sm:text-base ${
                          product.is_in_stock
                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                            : 'bg-slate-500 text-slate-300 cursor-not-allowed'
                        }`}
                      >
                        {product.is_in_stock ? 'В корзину' : 'Нет в наличии'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 sm:py-10 md:py-12 px-4">
                <div className="bg-slate-800 rounded-lg p-6 sm:p-8">
                  <Search className="h-12 w-12 sm:h-16 sm:w-16 text-slate-400 mx-auto mb-3 sm:mb-4" />
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">Товары не найдены</h3>
                  <p className="text-slate-300 mb-4 text-sm sm:text-base">
                    Попробуйте изменить параметры поиска или фильтры
                  </p>
                  <button
                    onClick={clearFilters}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 sm:px-6 py-2 rounded-lg transition-colors text-sm sm:text-base"
                  >
                    Сбросить фильтры
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
