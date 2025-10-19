'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Search, Menu, X, Star, ArrowRight } from 'lucide-react';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/products/products/featured/');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
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

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-white hover:text-blue-400 transition-colors">
                Главная
              </Link>
              <Link href="/products" className="text-white hover:text-blue-400 transition-colors">
                Каталог
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
            </nav>

            {/* Search and Cart */}
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center bg-slate-700 rounded-lg px-3 py-2">
                <Search className="h-4 w-4 text-slate-400 mr-2" />
                <input
                  type="text"
                  placeholder="Поиск товаров..."
                  className="bg-transparent text-white placeholder-slate-400 focus:outline-none"
                />
              </div>
              <button className="relative p-2 text-white hover:text-blue-400 transition-colors">
                <ShoppingCart className="h-6 w-6" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>
              <button
                className="md:hidden p-2 text-white hover:text-blue-400 transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-800 border-t border-slate-700">
            <div className="px-4 py-2 space-y-2">
              <Link href="/" className="block text-white hover:text-blue-400 transition-colors py-2">
                Главная
              </Link>
              <Link href="/products" className="block text-white hover:text-blue-400 transition-colors py-2">
                Каталог
              </Link>
              <Link href="/about" className="block text-white hover:text-blue-400 transition-colors py-2">
                О нас
              </Link>
              <Link href="/contact" className="block text-white hover:text-blue-400 transition-colors py-2">
                Контакты
              </Link>
              <Link href="/help" className="block text-white hover:text-blue-400 transition-colors py-2">
                Помощь
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Добро пожаловать в{' '}
              <span className="text-blue-400">PCMarket</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Ваш надежный партнер в мире компьютерных технологий. 
              Широкий выбор компьютеров, комплектующих и аксессуаров.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center"
              >
                Смотреть каталог
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/about"
                className="border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Узнать больше
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Популярные товары
            </h2>
            <p className="text-slate-300 text-lg">
              Лучшие предложения от ведущих производителей
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-slate-700 rounded-lg p-6 animate-pulse">
                  <div className="bg-slate-600 h-48 rounded-lg mb-4"></div>
                  <div className="bg-slate-600 h-4 rounded mb-2"></div>
                  <div className="bg-slate-600 h-4 rounded w-3/4 mb-4"></div>
                  <div className="bg-slate-600 h-6 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-slate-700 rounded-lg overflow-hidden hover:bg-slate-600 transition-colors">
                  <div className="aspect-w-16 aspect-h-9 bg-slate-600">
                    {product.image_url ? (
                      <Image
                        src={product.image_url}
                        alt={product.name}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <div className="w-full h-48 bg-slate-600 flex items-center justify-center">
                        <span className="text-slate-400">Нет изображения</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2 line-clamp-2">{product.name}</h3>
                    <p className="text-slate-400 text-sm mb-3">{product.brand}</p>
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
          )}
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Быстрая доставка</h3>
              <p className="text-slate-300">
                Доставляем заказы по всей Узбекистану в кратчайшие сроки
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Качество</h3>
              <p className="text-slate-300">
                Только оригинальные товары от проверенных производителей
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Поддержка</h3>
              <p className="text-slate-300">
                Квалифицированная техническая поддержка 24/7
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 border-t border-slate-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Image
                  src="/logo.svg"
                  alt="PCMarket"
                  width={32}
                  height={32}
                  className="h-8 w-auto"
                />
                <span className="text-xl font-bold text-blue-400">PCMarket</span>
              </div>
              <p className="text-slate-300">
                Ваш надежный партнер в мире компьютерных технологий
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Каталог</h4>
              <ul className="space-y-2 text-slate-300">
                <li><Link href="/products?type=computer" className="hover:text-blue-400 transition-colors">Компьютеры</Link></li>
                <li><Link href="/products?type=component" className="hover:text-blue-400 transition-colors">Комплектующие</Link></li>
                <li><Link href="/products?type=accessory" className="hover:text-blue-400 transition-colors">Аксессуары</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-slate-300">
                <li><Link href="/help" className="hover:text-blue-400 transition-colors">Помощь</Link></li>
                <li><Link href="/warranty" className="hover:text-blue-400 transition-colors">Гарантия</Link></li>
                <li><Link href="/delivery" className="hover:text-blue-400 transition-colors">Доставка</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-slate-300">
                <li>+998(33)433-44-04</li>
                <li>info@pcmarket.uz</li>
                <li>Samarkand, Amir Temur street, 123</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 PCMarket. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
