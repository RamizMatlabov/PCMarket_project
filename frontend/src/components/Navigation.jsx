'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Search, Menu, X, User } from 'lucide-react';
import { isAuthenticated, getCurrentUser, logout } from '@/utils/auth';
import { useRouter } from 'next/navigation';

export default function Navigation({ cart = [] }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      setAuthenticated(isAuthenticated());
      setUser(getCurrentUser());
    };
    
    checkAuth();
    
    // Слушаем кастомное событие изменения аутентификации
    const handleAuthChange = () => {
      checkAuth();
    };
    
    window.addEventListener('authChange', handleAuthChange);
    // Также проверяем при фокусе окна
    window.addEventListener('focus', checkAuth);
    
    return () => {
      window.removeEventListener('authChange', handleAuthChange);
      window.removeEventListener('focus', checkAuth);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setAuthenticated(false);
      setUser(null);
      router.push('/');
    }
  };

  return (
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
          <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
            <div className="hidden sm:flex items-center bg-slate-700 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2">
              <Search className="h-3 w-3 sm:h-4 sm:w-4 text-slate-400 mr-1.5 sm:mr-2" />
              <input
                type="text"
                placeholder="Поиск товаров..."
                className="bg-transparent text-white placeholder-slate-400 focus:outline-none text-xs sm:text-sm w-24 sm:w-32 md:w-40"
              />
            </div>
            <Link href="/cart" className="relative p-1.5 sm:p-2 text-white hover:text-blue-400 transition-colors">
              <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center text-xs">
                  {cart.length}
                </span>
              )}
            </Link>
            
            {/* Auth buttons */}
            {authenticated ? (
              <Link href="/profile" className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-xs sm:text-sm">
                <User className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="hidden sm:inline">{user?.first_name || user?.username || 'Профиль'}</span>
              </Link>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link href="/login" className="px-3 sm:px-4 py-1.5 sm:py-2 text-white hover:text-blue-400 transition-colors text-sm sm:text-base">
                  Вход
                </Link>
                <Link href="/register" className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm sm:text-base">
                  Регистрация
                </Link>
              </div>
            )}
            
            <button
              className="md:hidden p-1.5 sm:p-2 text-white hover:text-blue-400 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
            </button>
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
              {authenticated ? (
                <>
                  <Link href="/profile" className="block text-white hover:text-blue-400 transition-colors py-2">
                    Профиль
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left text-white hover:text-blue-400 transition-colors py-2"
                  >
                    Выйти
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="block text-white hover:text-blue-400 transition-colors py-2">
                    Вход
                  </Link>
                  <Link href="/register" className="block text-white hover:text-blue-400 transition-colors py-2">
                    Регистрация
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
