'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Search, Menu, X, User } from 'lucide-react';
import { isAuthenticated, getCurrentUser, logout } from '@/utils/auth';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const router = useRouter();
  const { totalItems } = useCart();

  const clearSearch = () => {
    setSearchQuery('');
    setSuggestions([]);
    setSuggestionsOpen(false);
  };

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

  // Handle scroll behavior - only on client side
  useEffect(() => {
    // Set initial scroll state on client after hydration
    const checkScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    // Check scroll position after component mounts
    checkScroll();
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

  // Debounce search query to avoid excessive API calls
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(searchQuery.trim()), 300);
    return () => clearTimeout(t);
  }, [searchQuery]);

  // Fetch suggestions when debounced query changes
  useEffect(() => {
    const q = debouncedQuery;
    if (!q) {
      setSuggestions([]);
      setSuggestionsOpen(false);
      return;
    }

    let aborted = false;
    const fetchSuggestions = async () => {
      try {
        setSuggestionsLoading(true);
        const url = `http://localhost:8000/api/products/products/?search=${encodeURIComponent(q)}&page_size=20`;
        const res = await fetch(url);
        const data = await res.json();
        const items = Array.isArray(data) ? data : (data.results || []);
        if (!aborted) {
          setSuggestions(items);
          setSuggestionsOpen(true);
        }
      } catch (e) {
        if (!aborted) {
          setSuggestions([]);
          setSuggestionsOpen(true);
        }
      } finally {
        if (!aborted) setSuggestionsLoading(false);
      }
    };
    fetchSuggestions();

    return () => {
      aborted = true;
    };
  }, [debouncedQuery]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      isScrolled 
        ? 'bg-slate-900/95 backdrop-blur-sm border-b border-slate-700 shadow-lg' 
        : 'bg-slate-800 border-b border-slate-700'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo1.png"
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
            {authenticated && (
              <Link href="/add-product" className="text-white hover:text-blue-400 transition-colors">
                Добавить товар
              </Link>
            )}
            <Link href="/about" className="text-white hover:text-blue-400 transition-colors">
              О нас
            </Link>
            <Link href="/contact" className="text-white hover:text-blue-400 transition-colors">
              Контакты
            </Link>
          </nav>

          {/* Search and Cart */}
          <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
            <div className="hidden sm:flex items-center bg-slate-700 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 relative">
              <Search className="h-3 w-3 sm:h-4 sm:w-4 text-slate-400 mr-1.5 sm:mr-2" />
              <input
                type="text"
                placeholder="Поиск товаров..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => {
                  if (suggestions.length > 0) setSuggestionsOpen(true);
                }}
                onBlur={() => {
                  // Delay closing to allow click on suggestion
                  setTimeout(() => setSuggestionsOpen(false), 150);
                }}
                className="bg-transparent text-white placeholder-slate-400 focus:outline-none text-xs sm:text-sm w-24 sm:w-32 md:w-40 pr-5 sm:pr-6"
              />
              {searchQuery.length > 0 && (
                <button
                  type="button"
                  aria-label="Очистить поиск"
                  onClick={clearSearch}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 sm:p-1 rounded hover:bg-slate-600 focus:outline-none"
                >
                  <X className="h-3 w-3 sm:h-4 sm:w-4 text-slate-300" />
                </button>
              )}
              {suggestionsOpen && (
                <div className="absolute left-0 top-full mt-2 w-60 sm:w-72 md:w-80 bg-slate-800 border border-slate-700 rounded-lg shadow-lg max-h-64 overflow-auto z-50">
                  {suggestionsLoading ? (
                    <div className="px-3 py-2 text-slate-300 text-sm">Загрузка...</div>
                  ) : suggestions.length > 0 ? (
                    <ul className="py-1">
                      {suggestions.map((item) => (
                        <li key={item.id} className="hover:bg-slate-700">
                          <a
                            href={`/products/${item.slug}`}
                            onMouseDown={(e) => {
                              e.preventDefault();
                              setSuggestionsOpen(false);
                              router.push(`/products/${item.slug}`);
                            }}
                            className="flex items-center px-3 py-2 text-sm text-white"
                          >
                            <span className="flex-1 line-clamp-1">{item.name}</span>
                            <span className="ml-2 text-blue-300 whitespace-nowrap">{item.price} USD</span>
                          </a>
                        </li>
                      ))}
                      <li className="border-t border-slate-700">
                        <a
                          href={`/products?search=${encodeURIComponent(searchQuery.trim())}`}
                          onMouseDown={(e) => {
                            e.preventDefault();
                            setSuggestionsOpen(false);
                            const q = searchQuery.trim();
                            router.push(q ? `/products?search=${encodeURIComponent(q)}` : '/products');
                          }}
                          className="block px-3 py-2 text-sm text-blue-400 hover:text-blue-300"
                        >
                          Показать все результаты
                        </a>
                      </li>
                    </ul>
                  ) : (
                    <div className="px-3 py-2 text-slate-300 text-sm">Ничего не найдено</div>
                  )}
                </div>
              )}
            </div>
            <Link href="/cart" className="relative p-1.5 sm:p-2 text-white hover:text-blue-400 transition-colors">
              <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center text-xs">
                  {totalItems}
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
              {authenticated && (
                <Link href="/add-product" className="block text-white hover:text-blue-400 transition-colors py-2">
                  Добавить товар
                </Link>
              )}
              <Link href="/about" className="block text-white hover:text-blue-400 transition-colors py-2">
                О нас
              </Link>
              <Link href="/contact" className="block text-white hover:text-blue-400 transition-colors py-2">
                Контакты
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
