'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Search, Filter, Star, ArrowLeft } from 'lucide-react';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [cart, setCart] = useState([]);
  const searchParams = useSearchParams();

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

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedType('');
    setSortBy('created_at');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo.svg"
                alt="PCMarket"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <span className="text-xl font-bold text-blue-400">PCMarket</span>
            </Link>

            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="flex items-center text-white hover:text-blue-400 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                На главную
              </Link>
              <Link href="/about" className="text-white hover:text-blue-400 transition-colors">
                О нас
              </Link>
              <Link href="/contact" className="text-white hover:text-blue-400 transition-colors">
                Контакты
              </Link>
              <Link href="/help" className="text-white hover:text-blue-400 transition-colors">
                Помощь
              </Link>
              <button className="relative p-2 text-white hover:text-blue-400 transition-colors">
                <ShoppingCart className="h-6 w-6" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <div className="bg-slate-800 rounded-lg p-6 sticky top-8">
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
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">Каталог товаров</h1>
              <p className="text-slate-300">
                Найдено товаров: {products.length}
              </p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div key={product.id} className="bg-slate-800 rounded-lg overflow-hidden hover:bg-slate-700 transition-colors">
                    <div className="aspect-w-16 aspect-h-9 bg-slate-700">
                      {product.image_url ? (
                        <Image
                          src={product.image_url}
                          alt={product.name}
                          width={300}
                          height={200}
                          className="w-full h-48 object-cover"
                        />
                      ) : (
                        <div className="w-full h-48 bg-slate-700 flex items-center justify-center">
                          <span className="text-slate-400">Нет изображения</span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">
                          {product.product_type === 'computer' ? 'Компьютер' : 
                           product.product_type === 'component' ? 'Комплектующее' : 'Аксессуар'}
                        </span>
                        <span className="text-xs text-slate-400">{product.category.name}</span>
                      </div>
                      <h3 className="text-lg font-semibold mb-2 line-clamp-2">{product.name}</h3>
                      <p className="text-slate-400 text-sm mb-3">{product.brand} {product.model}</p>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-bold text-blue-400">
                          {product.price} USD
                        </span>
                        <div className="flex items-center text-yellow-400">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="ml-1 text-sm">4.8</span>
                        </div>
                      </div>
                      <button
                        onClick={() => addToCart(product)}
                        disabled={!product.is_in_stock}
                        className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors ${
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
              <div className="text-center py-12">
                <div className="bg-slate-800 rounded-lg p-8">
                  <Search className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Товары не найдены</h3>
                  <p className="text-slate-300 mb-4">
                    Попробуйте изменить параметры поиска или фильтры
                  </p>
                  <button
                    onClick={clearFilters}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Сбросить фильтры
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
