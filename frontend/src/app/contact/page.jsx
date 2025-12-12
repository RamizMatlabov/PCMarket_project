'use client';

import { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../../components/Footer';
import { TextReveal } from '../../components/animations/TextReveal';
import { GlareCard } from '../../components/animations/CardHover';

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
            <TextReveal delay={0.2}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-2">
                Свяжитесь с <span className="text-blue-400">нами</span>
              </h1>
            </TextReveal>
            <TextReveal delay={0.4}>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-300 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
                Мы всегда готовы помочь вам с выбором и ответить на любые вопросы
              </p>
            </TextReveal>
          </div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-8 sm:py-12 md:py-16 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">Контактная информация</h2>
              <div className="space-y-6">
                {[
                  { icon: Phone, title: 'Телефон', value: '+998(33)433-44-04', desc: 'Бесплатно по Узбекистану' },
                  { icon: Mail, title: 'Email', value: 'info@pcmarket.uz', desc: 'Ответим в течение 24 часов' },
                  { icon: MapPin, title: 'Адрес', value: 'Samarkand, Amir Temur street, 123', desc: 'Офис и склад' },
                  { icon: Clock, title: 'Часы работы', value: 'Пн-Пт: 9:00 - 21:00', value2: 'Сб-Вс: 10:00 - 20:00' },
                ].map((contact, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <motion.div
                      className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <contact.icon className="h-6 w-6 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{contact.title}</h3>
                      <p className="text-slate-300">{contact.value}</p>
                      {contact.value2 && <p className="text-slate-300">{contact.value2}</p>}
                      {contact.desc && <p className="text-slate-400 text-sm">{contact.desc}</p>}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Additional Info */}
              <GlareCard className="mt-8 p-6 bg-slate-700 rounded-lg">
                <motion.h3
                  className="text-lg font-semibold mb-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Дополнительная информация
                </motion.h3>
                <ul className="space-y-2 text-slate-300">
                  {[
                    'Бесплатная консультация по подбору комплектующих',
                    'Техническая поддержка 24/7',
                    'Возможность заказать звонок',
                    'Онлайн-чат с консультантами',
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      • {item}
                    </motion.li>
                  ))}
                </ul>
              </GlareCard>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">Напишите нам</h2>
              
              <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  className="bg-green-600 rounded-lg p-6 text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  >
                    <CheckCircle className="h-16 w-16 text-white mx-auto mb-4" />
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-2">Сообщение отправлено!</h3>
                  <p className="text-green-100">
                    Спасибо за обращение. Мы свяжемся с вами в ближайшее время.
                  </p>
                  <motion.button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-lg transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Отправить еще одно сообщение
                  </motion.button>
                </motion.div>
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

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center ${
                      isSubmitting
                        ? 'bg-slate-600 text-slate-300 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="rounded-full h-5 w-5 border-b-2 border-white mr-2"
                        />
                        Отправка...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Отправить сообщение
                      </>
                    )}
                  </motion.button>
                </form>
              )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TextReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Часто задаваемые вопросы</h2>
              <p className="text-slate-300 text-lg">
                Быстрые ответы на популярные вопросы
              </p>
            </div>
          </TextReveal>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {[
              { q: 'Как быстро вы отвечаете на сообщения?', a: 'Мы отвечаем на все сообщения в течение 24 часов. По телефону консультанты доступны с 9:00 до 21:00 по Самаркандскому времени.' },
              { q: 'Можно ли получить консультацию по подбору ПК?', a: 'Конечно! Наши специалисты помогут подобрать оптимальную конфигурацию компьютера под ваши задачи и бюджет.' },
              { q: 'Есть ли возможность посетить офис?', a: 'Да, вы можете посетить наш офис и склад по адресу: Самарканд, ул. 123. Рекомендуем предварительно записаться.' },
              { q: 'Предоставляете ли вы техническую поддержку?', a: 'Да, мы предоставляем техническую поддержку 24/7 для всех наших клиентов. Обращайтесь любым удобным способом.' },
            ].map((faq, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5 }}
              >
                <GlareCard className="bg-slate-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-3">{faq.q}</h3>
                  <p className="text-slate-300">{faq.a}</p>
                </GlareCard>
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
