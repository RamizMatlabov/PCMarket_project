'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight, ShoppingCart, Search } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { useCart } from '@/context/CartContext';
import AddToCartModal from '../components/modals/AddToCartModal';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [showModal, setShowModal] = useState(false);

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

  const handleAddToCart = (product) => {
    addToCart(product);
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
    }, 2000);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <Navigation />
      <AddToCartModal show={showModal} onClose={closeModal} />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-2">
              Добро пожаловать в{' '}
              <span className="text-blue-400">PCMarket</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-300 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
              Ваш надежный партнер в мире компьютерных технологий. 
              Широкий выбор компьютеров, комплектующих и аксессуаров.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Link
                href="/products"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center text-sm sm:text-base"
              >
                Смотреть каталог
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
              <Link
                href="/about"
                className="border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold transition-colors text-sm sm:text-base text-center"
              >
                Узнать больше
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-8 sm:py-12 md:py-16 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-2">
              Популярные товары
            </h2>
            <p className="text-slate-300 text-sm sm:text-base md:text-lg px-2">
              Лучшие предложения от ведущих производителей
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-slate-700 rounded-lg p-4 sm:p-5 md:p-6 animate-pulse">
                  <div className="bg-slate-600 h-40 sm:h-44 md:h-48 rounded-lg mb-3 sm:mb-4"></div>
                  <div className="bg-slate-600 h-3 sm:h-4 rounded mb-2"></div>
                  <div className="bg-slate-600 h-3 sm:h-4 rounded w-3/4 mb-3 sm:mb-4"></div>
                  <div className="bg-slate-600 h-5 sm:h-6 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
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
                  <div className="p-4 sm:p-5 md:p-6">
                    <h3 className="text-base sm:text-lg font-semibold mb-2 line-clamp-2">{product.name}</h3>
                    <p className="text-slate-400 text-xs sm:text-sm mb-2 sm:mb-3">{product.brand}</p>
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
          )}
        </div>
      </section>

      {/* Features */}
      <section className="py-8 sm:py-12 md:py-16 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center px-4">
              <div className="bg-blue-600 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <ShoppingCart className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Быстрая доставка</h3>
              <p className="text-slate-300 text-sm sm:text-base">
                Доставляем заказы по всей Узбекистану в кратчайшие сроки
              </p>
            </div>
            <div className="text-center px-4">
              <div className="bg-blue-600 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Star className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Качество</h3>
              <p className="text-slate-300 text-sm sm:text-base">
                Только оригинальные товары от проверенных производителей
              </p>
            </div>
            <div className="text-center px-4 sm:col-span-2 md:col-span-1">
              <div className="bg-blue-600 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Search className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Поддержка</h3>
              <p className="text-slate-300 text-sm sm:text-base">
                Квалифицированная техническая поддержка 24/7
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
