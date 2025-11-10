'use client';

import { useMemo, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Trash2, Plus, Minus, CreditCard } from 'lucide-react';
import Footer from '../../components/Footer';
import { useCart } from '@/context/CartContext';
import { isAuthenticated } from '@/utils/auth';
import AuthRequiredModal from '../../components/modals/AuthRequiredModal';

export default function CartPage() {
  const [loading, setLoading] = useState(false);
  const { cart, updateQuantity, removeFromCart, clearCart, totalItems, totalPrice } = useCart();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const formattedTotalPrice = useMemo(() => totalPrice.toLocaleString(), [totalPrice]);

  const proceedToCheckout = () => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      setShowAuthModal(true);
      return;
    }
    // Redirect to checkout page
    window.location.href = '/checkout';
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center px-4">
            <ShoppingCart className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 text-slate-400 mx-auto mb-4 sm:mb-6" />
            <h1 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Корзина пуста</h1>
            <p className="text-slate-300 mb-6 sm:mb-8 text-sm sm:text-base">
              Добавьте товары в корзину, чтобы продолжить покупки
            </p>
            <Link
              href="/products"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold transition-colors inline-flex items-center text-sm sm:text-base"
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
      <AuthRequiredModal show={showAuthModal} onClose={closeAuthModal} action="оформить заказ" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Корзина</h1>
          <p className="text-slate-300 text-sm sm:text-base">
            {totalItems} товар(ов) на сумму {formattedTotalPrice} USD
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-3 sm:space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="bg-slate-800 rounded-lg p-4 sm:p-5 md:p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                    <div className="flex-shrink-0 w-full sm:w-auto flex sm:block">
                      {item.image_url ? (
                        <Image
                          src={item.image_url}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg mx-auto sm:mx-0"
                        />
                      ) : (
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-700 rounded-lg flex items-center justify-center mx-auto sm:mx-0">
                          <span className="text-slate-400 text-xs">Нет фото</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0 w-full sm:w-auto">
                      <h3 className="text-base sm:text-lg font-semibold mb-1 line-clamp-2">
                        {item.name}
                      </h3>
                      <p className="text-slate-400 text-xs sm:text-sm mb-2">{item.brand}</p>
                      <div className="flex items-center justify-between mb-2 sm:mb-0">
                        <span className="text-lg sm:text-xl font-bold text-blue-400">
                          {item.price}
                        </span>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 sm:p-1.5 rounded-full hover:bg-slate-700 transition-colors"
                          >
                            <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                          </button>
                          <span className="w-6 sm:w-8 text-center text-sm sm:text-base">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 sm:p-1.5 rounded-full hover:bg-slate-700 transition-colors"
                          >
                            <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start w-full sm:w-auto space-x-2 sm:space-x-0 sm:space-y-2">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <span className="text-base sm:text-lg font-semibold">
                        {(item.unitPrice * item.quantity).toLocaleString()} USD
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
            <div className="bg-slate-800 rounded-lg p-4 sm:p-5 md:p-6 lg:sticky lg:top-8">
              <h3 className="text-lg font-semibold mb-3 sm:mb-4">Итого</h3>
              
              <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                <div className="flex justify-between text-sm sm:text-base">
                  <span>Товары ({totalItems})</span>
                  <span>{formattedTotalPrice} USD</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span>Доставка</span>
                  <span className="text-green-400">Бесплатно</span>
                </div>
                <div className="border-t border-slate-700 pt-2 sm:pt-3">
                  <div className="flex justify-between text-base sm:text-lg font-semibold">
                    <span>Итого</span>
                    <span className="text-blue-400">{formattedTotalPrice} USD</span>
                  </div>
                </div>
              </div>

              <button
                onClick={proceedToCheckout}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg font-semibold transition-colors flex items-center justify-center text-sm sm:text-base"
              >
                <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                {loading ? 'Обработка...' : 'Оформить заказ'}
              </button>

              <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-slate-400 text-center">
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
