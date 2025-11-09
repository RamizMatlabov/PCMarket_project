'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { CreditCard, CheckCircle } from 'lucide-react';
import Footer from '../../components/Footer';
import { useCart } from '@/context/CartContext';

export default function CheckoutPage() {
  const { clearCart } = useCart();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postal_code: '',
    country: 'Russia',
    items: []
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const cartItems = JSON.parse(savedCart);
      setCart(cartItems);
      
      // Prepare items for order
      const orderItems = cartItems.map((item) => ({
        product_name: `${item.brand} ${item.name}`,
        product_price: item.price,
        quantity: item.quantity,
        total_price: (parseFloat(item.price.replace(/[^\d.]/g, '')) * item.quantity).toString()
      }));
      
      setFormData(prev => ({
        ...prev,
        items: orderItems
      }));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.first_name.trim()) {
      newErrors.first_name = 'Имя обязательно для заполнения';
    }
    
    if (!formData.last_name.trim()) {
      newErrors.last_name = 'Фамилия обязательна для заполнения';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email обязателен для заполнения';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Введите корректный email адрес';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Телефон обязателен для заполнения';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Адрес обязателен для заполнения';
    }
    
    if (!formData.city.trim()) {
      newErrors.city = 'Город обязателен для заполнения';
    }
    
    if (!formData.postal_code.trim()) {
      newErrors.postal_code = 'Почтовый индекс обязателен для заполнения';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form before submitting
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);

    try {
      const totalAmount = cart.reduce((total, item) => {
        const price = parseFloat(item.price.replace(/[^\d.]/g, ''));
        return total + (price * item.quantity);
      }, 0);

      // Convert price strings to numbers for the backend
      const orderItems = formData.items.map(item => ({
        ...item,
        product_price: parseFloat(item.product_price.replace(/[^\d.]/g, '')),
        total_price: parseFloat(item.total_price.replace(/[^\d.]/g, ''))
      }));

      const orderData = {
        ...formData,
        items: orderItems,
        total_amount: totalAmount.toFixed(2)
      };

      console.log('Sending order data:', JSON.stringify(orderData, null, 2));
      
      const response = await fetch('http://localhost:8000/api/orders/create-order/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
      
      console.log('Response status:', response.status);

      if (response.ok) {
        const result = await response.json();
        setOrderId(result.id);
        setOrderSuccess(true);
        // Clear cart
        clearCart();
        setCart([]);
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('Server error response:', errorData);
        throw new Error(errorData.error || 'Ошибка при создании заказа');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      alert(`Произошла ошибка при оформлении заказа: ${error.message}. Попробуйте еще раз.`);
    } finally {
      setLoading(false);
    }
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

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex flex-col">
        <div className="flex-1 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <CheckCircle className="h-24 w-24 text-green-400 mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4">Заказ успешно оформлен!</h1>
            <p className="text-slate-300 mb-8">
              Номер вашего заказа: <span className="text-blue-400 font-semibold">#{orderId}</span>
            </p>
            <p className="text-slate-300 mb-8">
              Мы отправили подтверждение на вашу электронную почту. 
              Наш менеджер свяжется с вами в ближайшее время для уточнения деталей доставки.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                На главную
              </Link>
              <Link
                href="/products"
                className="border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Продолжить покупки
              </Link>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex flex-col">
        <div className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Корзина пуста</h1>
            <p className="text-slate-300 mb-8">
              Добавьте товары в корзину, чтобы оформить заказ
            </p>
            <Link
              href="/products"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Перейти к каталогу
            </Link>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Оформление заказа</h1>
          <p className="text-slate-300">
            Заполните форму ниже для завершения покупки
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Form */}
          <div className="space-y-6">
            <div className="bg-slate-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Контактная информация</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Имя *</label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-3 py-2 bg-slate-700 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.first_name ? 'border-red-500' : 'border-slate-600'
                    }`}
                  />
                  {errors.first_name && (
                    <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Фамилия *</label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-3 py-2 bg-slate-700 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.last_name ? 'border-red-500' : 'border-slate-600'
                    }`}
                  />
                  {errors.last_name && (
                    <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-3 py-2 bg-slate-700 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.email ? 'border-red-500' : 'border-slate-600'
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">Телефон *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="+998 (99) 123-45-67"
                  className={`w-full px-3 py-2 bg-slate-700 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.phone ? 'border-red-500' : 'border-slate-600'
                  }`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>
            </div>

            <div className="bg-slate-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Адрес доставки</h3>
              
              <div>
                <label className="block text-sm font-medium mb-2">Адрес *</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  placeholder="Улица, дом, квартира"
                  className={`w-full px-3 py-2 bg-slate-700 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.address ? 'border-red-500' : 'border-slate-600'
                  }`}
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Город *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-3 py-2 bg-slate-700 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.city ? 'border-red-500' : 'border-slate-600'
                    }`}
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Почтовый индекс *</label>
                  <input
                    type="text"
                    name="postal_code"
                    value={formData.postal_code}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-3 py-2 bg-slate-700 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.postal_code ? 'border-red-500' : 'border-slate-600'
                    }`}
                  />
                  {errors.postal_code && (
                    <p className="text-red-500 text-sm mt-1">{errors.postal_code}</p>
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              onClick={handleSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center"
            >
              <CreditCard className="h-5 w-5 mr-2" />
              {loading ? 'Обработка...' : 'Оформить заказ'}
            </button>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-slate-800 rounded-lg p-6 lg:sticky lg:top-8">
              <h3 className="text-lg font-semibold mb-4">Ваш заказ</h3>
              
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    {item.image_url ? (
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <Image
                          src={item.image_url}
                          alt={item.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-slate-400 text-xs">Нет фото</span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium line-clamp-2">{item.name}</h4>
                      <p className="text-slate-400 text-xs">{item.brand}</p>
                      <p className="text-slate-300 text-sm">Количество: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        {(parseFloat(item.price.replace(/[^\d.]/g, '')) * item.quantity).toLocaleString()} USD
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-700 pt-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Итого ({getTotalItems()} товар(ов))</span>
                  <span className="text-blue-400">{getTotalPrice().toLocaleString()} USD</span>
                </div>
                <p className="text-sm text-slate-400 mt-2">
                  Доставка: Бесплатно
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
