'use client';

import { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Search, Menu, X } from 'lucide-react';

export default function Navigation({ cart = [] }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center bg-slate-700 rounded-lg px-3 py-2">
              <Search className="h-4 w-4 text-slate-400 mr-2" />
              <input
                type="text"
                placeholder="Поиск товаров..."
                className="bg-transparent text-white placeholder-slate-400 focus:outline-none"
              />
            </div>
            <Link href="/cart" className="relative p-2 text-white hover:text-blue-400 transition-colors">
              <ShoppingCart className="h-6 w-6" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>
            <button
              className="md:hidden p-2 text-white hover:text-blue-400 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
