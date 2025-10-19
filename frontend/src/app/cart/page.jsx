'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Trash2, Plus, Minus, CreditCard } from 'lucide-react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    setCart(cart.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace(/[^\d.]/g, ''));
      return total + (price * item.quantity);
    }, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const proceedToCheckout = () => {
    // Here you would typically redirect to checkout page
    alert('Переход к оформлению заказа');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-slate-900 text-white">
        {/* Header */}
        <Navigation cart={cart} />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <ShoppingCart className="h-24 w-24 text-slate-400 mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4">Корзина пуста</h1>
            <p className="text-slate-300 mb-8">
              Добавьте товары в корзину, чтобы продолжить покупки
            </p>
            <Link
              href="/products"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center"
            >
              Перейти к каталогу
            </Link>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <Navigation cart={cart} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Корзина</h1>
          <p className="text-slate-300">
            {getTotalItems()} товар(ов) на сумму {getTotalPrice().toLocaleString()} USD
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="bg-slate-800 rounded-lg p-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {item.image_url ? (
                        <Image
                          src={item.image_url}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-20 h-20 bg-slate-700 rounded-lg flex items-center justify-center">
                          <span className="text-slate-400 text-xs">Нет фото</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold mb-1 line-clamp-2">
                        {item.name}
                      </h3>
                      <p className="text-slate-400 text-sm mb-2">{item.brand}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-blue-400">
                          {item.price} USD
                        </span>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 rounded-full hover:bg-slate-700 transition-colors"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 rounded-full hover:bg-slate-700 transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end space-y-2">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <span className="text-lg font-semibold">
                        {(parseFloat(item.price.replace(/[^\d.]/g, '')) * item.quantity).toLocaleString()} USD
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-between">
              <button
                onClick={clearCart}
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                Очистить корзину
              </button>
              <Link
                href="/products"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Продолжить покупки
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800 rounded-lg p-6 sticky top-8">
              <h3 className="text-lg font-semibold mb-4">Итого</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Товары ({getTotalItems()})</span>
                  <span>{getTotalPrice().toLocaleString()} USD</span>
                </div>
                <div className="flex justify-between">
                  <span>Доставка</span>
                  <span className="text-green-400">Бесплатно</span>
                </div>
                <div className="border-t border-slate-700 pt-3">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Итого</span>
                    <span className="text-blue-400">{getTotalPrice().toLocaleString()} USD</span>
                  </div>
                </div>
              </div>

              <button
                onClick={proceedToCheckout}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center"
              >
                <CreditCard className="h-5 w-5 mr-2" />
                {loading ? 'Обработка...' : 'Оформить заказ'}
              </button>

              <div className="mt-4 text-sm text-slate-400 text-center">
                <p>Безопасная оплата</p>
                <p>Быстрая доставка по всей Узбекистану</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
