'use client';

import { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { Search, ChevronDown, ChevronUp, HelpCircle, BookOpen, MessageCircle, Phone, Mail, FileText, Settings, ShoppingCart, CreditCard, Truck, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../../components/Footer';
import { TextReveal } from '../../components/animations/TextReveal';
import { GlareCard } from '../../components/animations/CardHover';

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedItems, setExpandedItems] = useState({});

  const toggleExpanded = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const faqData = [
    {
      id: 'order',
      category: 'Заказы',
      icon: ShoppingCart,
      questions: [
        {
          id: 'order-1',
          question: 'Как оформить заказ?',
          answer: 'Для оформления заказа добавьте товары в корзину, перейдите к оформлению заказа, заполните контактные данные и выберите способ доставки. После подтверждения заказа с вами свяжется менеджер для уточнения деталей.'
        },
        {
          id: 'order-2',
          question: 'Можно ли изменить заказ после оформления?',
          answer: 'Да, вы можете изменить заказ в течение 2 часов после оформления, связавшись с нашим менеджером по телефону +998(33)433-44-04 или написав на info@pcmarket.uz.'
        },
        {
          id: 'order-3',
          question: 'Как отменить заказ?',
          answer: 'Заказ можно отменить в течение 24 часов после оформления. Для отмены свяжитесь с нашим менеджером или напишите на email с указанием номера заказа.'
        }
      ]
    },
    {
      id: 'payment',
      category: 'Оплата',
      icon: CreditCard,
      questions: [
        {
          id: 'payment-1',
          question: 'Какие способы оплаты доступны?',
          answer: 'Мы принимаем оплату банковскими картами (Visa, MasterCard, МИР), банковскими переводами, наличными при получении, а также через электронные кошельки (ЮMoney, QIWI).'
        },
        {
          id: 'payment-2',
          question: 'Безопасна ли оплата картой?',
          answer: 'Да, все платежи обрабатываются через защищенный шлюз с использованием SSL-шифрования. Мы не храним данные ваших карт.'
        },
        {
          id: 'payment-3',
          question: 'Можно ли оплатить заказ частями?',
          answer: 'Да, мы предоставляем рассрочку и кредитование через наших партнеров. Подробности уточняйте у менеджера при оформлении заказа.'
        }
      ]
    },
    {
      id: 'delivery',
      category: 'Доставка',
      icon: Truck,
      questions: [
        {
          id: 'delivery-1',
          question: 'В какие города осуществляется доставка?',
          answer: 'Мы доставляем товары по всей Узбекистану. Стоимость и сроки доставки зависят от региона. В Самарканде и области доступна курьерская доставка в день заказа.'
        },
        {
          id: 'delivery-2',
          question: 'Сколько стоит доставка?',
          answer: 'Доставка по Самарканду - от 500 USD, по Узбекистан - от 800 USD. При заказе от 50 000 USD доставка бесплатная. Точную стоимость рассчитает менеджер при оформлении заказа.'
        },
        {
          id: 'delivery-3',
          question: 'Можно ли отследить заказ?',
          answer: 'Да, после отправки заказа мы предоставляем трек-номер для отслеживания. Вы можете отслеживать статус заказа в личном кабинете или уточнить у менеджера.'
        }
      ]
    },
    {
      id: 'warranty',
      category: 'Гарантия',
      icon: Shield,
      questions: [
        {
          id: 'warranty-1',
          question: 'Какая гарантия на товары?',
          answer: 'На все товары предоставляется официальная гарантия производителя от 12 до 36 месяцев в зависимости от типа товара. Гарантийные обязательства указаны в описании каждого товара.'
        },
        {
          id: 'warranty-2',
          question: 'Как воспользоваться гарантией?',
          answer: 'При возникновении неисправности обратитесь в наш сервисный центр с товаром и документами. Мы проведем диагностику и при необходимости заменим товар или отправим на ремонт.'
        },
        {
          id: 'warranty-3',
          question: 'Что не покрывается гарантией?',
          answer: 'Гарантия не распространяется на механические повреждения, повреждения от попадания жидкости, неправильной эксплуатации, а также на расходные материалы.'
        }
      ]
    },
    {
      id: 'technical',
      category: 'Техническая поддержка',
      icon: Settings,
      questions: [
        {
          id: 'tech-1',
          question: 'Поможете с настройкой компьютера?',
          answer: 'Да, мы предоставляем услуги по сборке, настройке и установке программного обеспечения. Стоимость услуг уточняйте у менеджера.'
        },
        {
          id: 'tech-2',
          question: 'Есть ли сервисный центр?',
          answer: 'У нас есть собственный сервисный центр, оснащенный современным оборудованием. Мы ремонтируем компьютеры, ноутбуки и комплектующие всех марок.'
        },
        {
          id: 'tech-3',
          question: 'Сколько времени занимает ремонт?',
          answer: 'Срок ремонта зависит от сложности неисправности и наличия запчастей. Обычно ремонт занимает от 3 до 14 дней. Точные сроки сообщаются после диагностики.'
        }
      ]
    }
  ];

  const filteredData = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <TextReveal delay={0.2}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-2">
                Центр <span className="text-blue-400">помощи</span>
              </h1>
            </TextReveal>
            <TextReveal delay={0.4}>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-300 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
                Найдите ответы на ваши вопросы или свяжитесь с нашей службой поддержки
              </p>
            </TextReveal>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <motion.input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Поиск по вопросам и ответам..."
              className="w-full pl-12 pr-4 py-4 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            />
          </motion.div>
        </div>
      </section>

      {/* Quick Help */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TextReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Быстрая помощь</h2>
              <p className="text-slate-300 text-lg">
                Выберите нужный раздел для получения помощи
              </p>
            </div>
          </TextReveal>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
          >
            {[
              { icon: MessageCircle, title: 'Онлайн-чат', desc: 'Быстрая помощь в реальном времени', href: '/contact' },
              { icon: Phone, title: 'Телефон', desc: '+998(33)433-44-04', href: '/contact' },
              { icon: Mail, title: 'Email', desc: 'info@pcmarket.uz', href: '/contact' },
              { icon: FileText, title: 'Документы', desc: 'Условия и договоры', href: '/delivery' },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5 }}
              >
                <GlareCard>
                  <Link href={item.href} className="block bg-slate-800 rounded-lg p-6 hover:bg-slate-700 transition-colors text-center">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <item.icon className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                    </motion.div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-slate-300 text-sm">{item.desc}</p>
                  </Link>
                </GlareCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TextReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Часто задаваемые вопросы</h2>
              <motion.p
                className="text-slate-300 text-lg"
                key={searchTerm}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {searchTerm ? `Найдено результатов: ${filteredData.reduce((acc, cat) => acc + cat.questions.length, 0)}` : 'Выберите категорию для просмотра вопросов'}
              </motion.p>
            </div>
          </TextReveal>

          <motion.div
            className="space-y-6"
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
            {filteredData.map((category) => (
              <motion.div
                key={category.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.4 }}
              >
                <GlareCard className="bg-slate-700 rounded-lg overflow-hidden">
                  <motion.button
                    onClick={() => toggleExpanded(category.id)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-600 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-center space-x-3">
                      <motion.div
                        animate={{ rotate: expandedItems[category.id] ? 360 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <category.icon className="h-6 w-6 text-blue-400" />
                      </motion.div>
                      <h3 className="text-xl font-semibold">{category.category}</h3>
                      <span className="text-slate-400 text-sm">({category.questions.length})</span>
                    </div>
                    <AnimatePresence mode="wait">
                      {expandedItems[category.id] ? (
                        <motion.div
                          key="up"
                          initial={{ rotate: -180 }}
                          animate={{ rotate: 0 }}
                          exit={{ rotate: 180 }}
                        >
                          <ChevronUp className="h-5 w-5 text-slate-400" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="down"
                          initial={{ rotate: 180 }}
                          animate={{ rotate: 0 }}
                          exit={{ rotate: -180 }}
                        >
                          <ChevronDown className="h-5 w-5 text-slate-400" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>

                  <AnimatePresence>
                    {expandedItems[category.id] && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-4 space-y-4">
                          {category.questions.map((item, index) => (
                            <motion.div
                              key={item.id}
                              className="border-l-2 border-blue-400 pl-4"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <h4 className="font-semibold mb-2">{item.question}</h4>
                              <p className="text-slate-300 text-sm leading-relaxed">{item.answer}</p>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </GlareCard>
              </motion.div>
            ))}
          </motion.div>

          <AnimatePresence>
            {filteredData.length === 0 && searchTerm && (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                >
                  <HelpCircle className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">Ничего не найдено</h3>
                <p className="text-slate-300 mb-4">
                  Попробуйте изменить поисковый запрос или обратитесь в службу поддержки
                </p>
                <motion.button
                  onClick={() => setSearchTerm('')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Очистить поиск
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TextReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Дополнительные ресурсы</h2>
              <p className="text-slate-300 text-lg">
                Полезные материалы и инструкции
              </p>
            </div>
          </TextReveal>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
          >
            {[
              { icon: BookOpen, title: 'Руководства пользователя', desc: 'Подробные инструкции по настройке и использованию оборудования', href: '/contact' },
              { icon: Settings, title: 'Техническая документация', desc: 'Спецификации, схемы подключения и технические характеристики', href: '/contact' },
              { icon: HelpCircle, title: 'Видеоуроки', desc: 'Пошаговые видеоинструкции по сборке и настройке компьютеров', href: '/contact' },
            ].map((resource, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5 }}
              >
                <GlareCard className="bg-slate-800 rounded-lg p-6">
                  <resource.icon className="h-12 w-12 text-blue-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-3">{resource.title}</h3>
                  <p className="text-slate-300 mb-4">{resource.desc}</p>
                  <Link
                    href={resource.href}
                    className="text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center group"
                  >
                    {resource.title === 'Руководства пользователя' && 'Скачать руководства'}
                    {resource.title === 'Техническая документация' && 'Открыть документацию'}
                    {resource.title === 'Видеоуроки' && 'Смотреть видео'}
                    <motion.span
                      className="ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </Link>
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
