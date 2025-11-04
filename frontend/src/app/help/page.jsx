'use client';

import { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { Search, ChevronDown, ChevronUp, HelpCircle, BookOpen, MessageCircle, Phone, Mail, FileText, Settings, ShoppingCart, CreditCard, Truck, Shield } from 'lucide-react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

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
      {/* Header */}
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-2">
              Центр <span className="text-blue-400">помощи</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-300 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
              Найдите ответы на ваши вопросы или свяжитесь с нашей службой поддержки
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Поиск по вопросам и ответам..."
              className="w-full pl-12 pr-4 py-4 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </section>

      {/* Quick Help */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Быстрая помощь</h2>
            <p className="text-slate-300 text-lg">
              Выберите нужный раздел для получения помощи
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            <Link href="/contact" className="bg-slate-800 rounded-lg p-6 hover:bg-slate-700 transition-colors text-center">
              <MessageCircle className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Онлайн-чат</h3>
              <p className="text-slate-300 text-sm">Быстрая помощь в реальном времени</p>
            </Link>

            <Link href="/contact" className="bg-slate-800 rounded-lg p-6 hover:bg-slate-700 transition-colors text-center">
              <Phone className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Телефон</h3>
              <p className="text-slate-300 text-sm">+998(33)433-44-04</p>
            </Link>

            <Link href="/contact" className="bg-slate-800 rounded-lg p-6 hover:bg-slate-700 transition-colors text-center">
              <Mail className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-slate-300 text-sm">info@pcmarket.uz</p>
            </Link>

            <Link href="/delivery" className="bg-slate-800 rounded-lg p-6 hover:bg-slate-700 transition-colors text-center">
              <FileText className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Документы</h3>
              <p className="text-slate-300 text-sm">Условия и договоры</p>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Часто задаваемые вопросы</h2>
            <p className="text-slate-300 text-lg">
              {searchTerm ? `Найдено результатов: ${filteredData.reduce((acc, cat) => acc + cat.questions.length, 0)}` : 'Выберите категорию для просмотра вопросов'}
            </p>
          </div>

          <div className="space-y-6">
            {filteredData.map((category) => (
              <div key={category.id} className="bg-slate-700 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleExpanded(category.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-600 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <category.icon className="h-6 w-6 text-blue-400" />
                    <h3 className="text-xl font-semibold">{category.category}</h3>
                    <span className="text-slate-400 text-sm">({category.questions.length})</span>
                  </div>
                  {expandedItems[category.id] ? (
                    <ChevronUp className="h-5 w-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-slate-400" />
                  )}
                </button>

                {expandedItems[category.id] && (
                  <div className="px-6 pb-4 space-y-4">
                    {category.questions.map((item) => (
                      <div key={item.id} className="border-l-2 border-blue-400 pl-4">
                        <h4 className="font-semibold mb-2">{item.question}</h4>
                        <p className="text-slate-300 text-sm leading-relaxed">{item.answer}</p>
                      </div>
                    ))}
                  </div>  
                )}
              </div>
            ))}
          </div>

          {filteredData.length === 0 && searchTerm && (
            <div className="text-center py-12">
              <HelpCircle className="h-16 w-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Ничего не найдено</h3>
              <p className="text-slate-300 mb-4">
                Попробуйте изменить поисковый запрос или обратитесь в службу поддержки
              </p>
              <button
                onClick={() => setSearchTerm('')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Очистить поиск
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Дополнительные ресурсы</h2>
            <p className="text-slate-300 text-lg">
              Полезные материалы и инструкции
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-slate-800 rounded-lg p-6">
              <BookOpen className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Руководства пользователя</h3>
              <p className="text-slate-300 mb-4">
                Подробные инструкции по настройке и использованию оборудования
              </p>
              <Link href="/contact" className="text-blue-400 hover:text-blue-300 transition-colors">
                Скачать руководства →
              </Link>
            </div>

            <div className="bg-slate-800 rounded-lg p-6">
              <Settings className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Техническая документация</h3>
              <p className="text-slate-300 mb-4">
                Спецификации, схемы подключения и технические характеристики
              </p>
              <Link href="/contact" className="text-blue-400 hover:text-blue-300 transition-colors">
                Открыть документацию →
              </Link>
            </div>

            <div className="bg-slate-800 rounded-lg p-6">
              <HelpCircle className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Видеоуроки</h3>
              <p className="text-slate-300 mb-4">
                Пошаговые видеоинструкции по сборке и настройке компьютеров
              </p>
              <Link href="/contact" className="text-blue-400 hover:text-blue-300 transition-colors">
                Смотреть видео →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
