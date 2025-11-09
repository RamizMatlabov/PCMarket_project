'use client';

import { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import Footer from '../../components/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-2">
              Свяжитесь с <span className="text-blue-400">нами</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-300 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
              Мы всегда готовы помочь вам с выбором и ответить на любые вопросы
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-8 sm:py-12 md:py-16 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Контактная информация</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Телефон</h3>
                    <p className="text-slate-300">+998(33)433-44-04</p>
                    <p className="text-slate-400 text-sm">Бесплатно по Узбекистану</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Email</h3>
                    <p className="text-slate-300">info@pcmarket.uz</p>
                    <p className="text-slate-400 text-sm">Ответим в течение 24 часов</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Адрес</h3>
                    <p className="text-slate-300">Samarkand, Amir Temur street, 123</p>
                    <p className="text-slate-400 text-sm">Офис и склад</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Часы работы</h3>
                    <p className="text-slate-300">Пн-Пт: 9:00 - 21:00</p>
                    <p className="text-slate-300">Сб-Вс: 10:00 - 20:00</p>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-8 p-6 bg-slate-700 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">Дополнительная информация</h3>
                <ul className="space-y-2 text-slate-300">
                  <li>• Бесплатная консультация по подбору комплектующих</li>
                  <li>• Техническая поддержка 24/7</li>
                  <li>• Возможность заказать звонок</li>
                  <li>• Онлайн-чат с консультантами</li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Напишите нам</h2>
              
              {isSubmitted ? (
                <div className="bg-green-600 rounded-lg p-6 text-center">
                  <CheckCircle className="h-16 w-16 text-white mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Сообщение отправлено!</h3>
                  <p className="text-green-100">
                    Спасибо за обращение. Мы свяжемся с вами в ближайшее время.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Отправить еще одно сообщение
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Имя *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Ваше имя"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2">
                        Телефон
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="+998 (99) 123-45-67"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2">
                        Тема *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Выберите тему</option>
                        <option value="general">Общий вопрос</option>
                        <option value="product">Вопрос о товаре</option>
                        <option value="order">Заказ</option>
                        <option value="warranty">Гарантия</option>
                        <option value="delivery">Доставка</option>
                        <option value="technical">Техническая поддержка</option>
                        <option value="other">Другое</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Сообщение *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      placeholder="Опишите ваш вопрос или проблему..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center ${
                      isSubmitting
                        ? 'bg-slate-600 text-slate-300 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Отправка...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Отправить сообщение
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Часто задаваемые вопросы</h2>
            <p className="text-slate-300 text-lg">
              Быстрые ответы на популярные вопросы
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Как быстро вы отвечаете на сообщения?</h3>
              <p className="text-slate-300">
                Мы отвечаем на все сообщения в течение 24 часов. По телефону консультанты 
                доступны с 9:00 до 21:00 по Самаркандскому времени.
              </p>
            </div>

            <div className="bg-slate-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Можно ли получить консультацию по подбору ПК?</h3>
              <p className="text-slate-300">
                Конечно! Наши специалисты помогут подобрать оптимальную конфигурацию 
                компьютера под ваши задачи и бюджет.
              </p>
            </div>

            <div className="bg-slate-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Есть ли возможность посетить офис?</h3>
              <p className="text-slate-300">
                Да, вы можете посетить наш офис и склад по адресу: Самарканд, ул. 123. 
                Рекомендуем предварительно записаться.
              </p>
            </div>

            <div className="bg-slate-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Предоставляете ли вы техническую поддержку?</h3>
              <p className="text-slate-300">
                Да, мы предоставляем техническую поддержку 24/7 для всех наших клиентов. 
                Обращайтесь любым удобным способом.
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
