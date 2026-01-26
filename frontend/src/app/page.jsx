'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight, ShoppingCart, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import { useCart } from '@/context/CartContext';
import AddToCartModal from '../components/modals/AddToCartModal';
import AuthRequiredModal from '../components/modals/AuthRequiredModal';
import api from '@/utils/api';
import { TextReveal } from '../components/animations/TextReveal';
import { GlareCard } from '../components/animations/CardHover';
import { HoverBorderGradient } from '../components/animations/ButtonAnimations';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart, showAuthModal, authModalAction, closeAuthModal } = useCart();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Сначала пытаемся получить featured продукты
      try {
        const response = await api.get('/api/products/products/featured/');
        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
          setProducts(response.data);
          return;
        }
      } catch (featuredError) {
        console.warn('Featured products endpoint failed, trying regular products:', featuredError);
      }
      
      // Если featured не сработал, используем прямой fetch как в products/page.jsx
      try {
        const url = `${API_BASE_URL}/api/products/products/?page_size=8`;
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Обрабатываем пагинацию: если есть results, используем их, иначе весь массив
        if (data.results) {
          setProducts(data.results);
        } else if (Array.isArray(data)) {
          setProducts(data.slice(0, 8));
        } else {
          setProducts([]);
        }
      } catch (fetchError) {
        console.error('Fetch error:', fetchError);
        // Последняя попытка через api с параметрами
        try {
          const response = await api.get('/api/products/products/', {
            params: {
              page_size: 8
            }
          });
          if (response.data && response.data.results) {
            setProducts(response.data.results);
          } else if (Array.isArray(response.data)) {
            setProducts(response.data.slice(0, 8));
          } else {
            setProducts([]);
          }
        } catch (apiError) {
          console.error('API error:', apiError);
          throw apiError;
        }
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        url: error.config?.url || error.response?.config?.url
      });
      setError('Не удалось загрузить товары. Проверьте подключение к серверу.');
      setProducts([]);
    } finally {
      setLoading(false);
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

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <AddToCartModal show={showModal} onClose={closeModal} />
      <AuthRequiredModal show={showAuthModal} onClose={closeAuthModal} action={authModalAction} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <TextReveal delay={0.2}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-2">
                Добро пожаловать в{' '}
                <motion.span
                  className="text-blue-400 inline-block"
                  animate={{
                    textShadow: [
                      '0 0 10px rgba(59, 130, 246, 0.5)',
                      '0 0 20px rgba(59, 130, 246, 0.8)',
                      '0 0 10px rgba(59, 130, 246, 0.5)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  PCMarket
                </motion.span>
              </h1>
            </TextReveal>
            <TextReveal delay={0.4}>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-300 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
                Ваш надежный партнер в мире компьютерных технологий. 
                Широкий выбор компьютеров, комплектующих и аксессуаров.
              </p>
            </TextReveal>
            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <HoverBorderGradient>
                <Link
                  href="/products"
                  className="block bg-slate-800 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center text-sm sm:text-base"
                >
                  Смотреть каталог
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </motion.div>
                </Link>
              </HoverBorderGradient>
              <Link
                href="/about"
                className="border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base text-center relative overflow-hidden group"
              >
                <span className="relative z-10">Узнать больше</span>
                <motion.div
                  className="absolute inset-0 bg-blue-400"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-8 sm:py-12 md:py-16 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TextReveal>
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <motion.h2
                className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Популярные товары
              </motion.h2>
              <motion.p
                className="text-slate-300 text-sm sm:text-base md:text-lg px-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Лучшие предложения от ведущих производителей
              </motion.p>
            </div>
          </TextReveal>

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg mb-6">
              <p className="font-medium">Ошибка загрузки</p>
              <p className="text-sm">{error}</p>
            </div>
          )}
          
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
          ) : products.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <GlareCard className="bg-slate-700 rounded-lg overflow-hidden h-full flex flex-col">
                    <Link href={`/products/${product.slug}`}>
                      <motion.div
                        className="aspect-w-16 aspect-h-9 bg-slate-600 relative overflow-hidden"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
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
                      </motion.div>
                    </Link>
                    <div className="p-4 sm:p-5 md:p-6 flex-1 flex flex-col">
                      <Link href={`/products/${product.slug}`} className="hover:underline">
                        <h3 className="text-base sm:text-lg font-semibold mb-2 line-clamp-2">{product.name}</h3>
                      </Link>
                      <p className="text-slate-400 text-xs sm:text-sm mb-2 sm:mb-3">{product.brand}</p>
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
          ) : !loading && !error ? (
            <div className="text-center py-12">
              <p className="text-slate-400 text-lg">Нет доступных товаров</p>
            </div>
          ) : null}
        </div>
      </section>

      {/* Features */}
      <section className="py-8 sm:py-12 md:py-16 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            {[
              { icon: ShoppingCart, title: 'Быстрая доставка', text: 'Доставляем заказы по всей Узбекистану в кратчайшие сроки', noRotation: true },
              { icon: Star, title: 'Качество', text: 'Только оригинальные товары от проверенных производителей' },
              { icon: Search, title: 'Поддержка', text: 'Квалифицированная техническая поддержка 24/7', noRotation: true },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className={`text-center px-4 ${index === 2 ? 'sm:col-span-2 md:col-span-1' : ''}`}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -10 }}
              >
                <motion.div
                  className="bg-blue-600 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4"
                  whileHover={feature.noRotation ? { scale: 1.1 } : { rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <feature.icon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />
                </motion.div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-slate-300 text-sm sm:text-base">{feature.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
