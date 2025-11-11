'use client';

import Image from "next/image";
import Link from "next/link";
import { Truck, MapPin, Clock, Package, CreditCard, Shield, CheckCircle, Phone, Mail } from 'lucide-react';

export default function DeliveryPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-2">
              Условия <span className="text-blue-400">доставки</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-300 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
              Быстрая и надежная доставка по всей Узбекистану с возможностью отслеживания
            </p>
          </div>
        </div>
      </section>

      {/* Delivery Methods */}
      <section className="py-16 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Способы доставки</h2>
            <p className="text-slate-300 text-lg">
              Выберите наиболее удобный для вас способ получения заказа
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8">
            <div className="bg-slate-700 rounded-lg p-6">
              <div className="bg-blue-600 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">Курьерская доставка</h3>
              <div className="space-y-2 text-slate-300">
                <p><strong>Стоимость:</strong> от 500 USD</p>
                <p><strong>Срок:</strong> 1-3 дня</p>
                <p><strong>Зона:</strong> Самарканд и область</p>
                <p><strong>Время:</strong> 9:00 - 21:00</p>
              </div>
              <ul className="mt-4 space-y-1 text-sm text-slate-400">
                <li>• Доставка до двери</li>
                <li>• Возможность примерки</li>
                <li>• Оплата при получении</li>
                <li>• SMS-уведомления</li>
              </ul>
            </div>

            <div className="bg-slate-700 rounded-lg p-6">
              <div className="bg-blue-600 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Package className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">Почтовая доставка</h3>
              <div className="space-y-2 text-slate-300">
                <p><strong>Стоимость:</strong> от 800 USD</p>
                <p><strong>Срок:</strong> 3-7 дней</p>
                <p><strong>Зона:</strong> Вся Узбекистан</p>
                <p><strong>Время:</strong> По графику почты</p>
              </div>
              <ul className="mt-4 space-y-1 text-sm text-slate-400">
                <li>• Доставка в отделение</li>
                <li>• Отслеживание трека</li>
                <li>• Страхование груза</li>
                <li>• Уведомления о статусе</li>
              </ul>
            </div>

            <div className="bg-slate-700 rounded-lg p-6">
              <div className="bg-blue-600 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">Самовывоз</h3>
              <div className="space-y-2 text-slate-300">
                <p><strong>Стоимость:</strong> Бесплатно</p>
                <p><strong>Срок:</strong> В день заказа</p>
                <p><strong>Зона:</strong> Самарканд</p>
                <p><strong>Время:</strong> 10:00 - 20:00</p>
              </div>
              <ul className="mt-4 space-y-1 text-sm text-slate-400">
                <li>• Бесплатная парковка</li>
                <li>• Тестирование товара</li>
                <li>• Консультация специалиста</li>
                <li>• Немедленное получение</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Zones */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Зоны доставки</h2>
            <p className="text-slate-300 text-lg">
              Мы доставляем товары по всей территории Узбекистана
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Самарканд и Самаркандская область</h3>
              <div className="space-y-4">
                <div className="bg-slate-800 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-400 mb-2">Курьерская доставка</h4>
                  <p className="text-slate-300 text-sm">Доставка в день заказа или на следующий день</p>
                  <p className="text-slate-400 text-sm">Стоимость: от 500 USD</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-400 mb-2">Самовывоз</h4>
                  <p className="text-slate-300 text-sm">Бесплатный самовывоз из нашего офиса</p>
                  <p className="text-slate-400 text-sm">Адрес: Самарканд, ул. Примерная, 123</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-6">Регионы Узбекистана</h3>
              <div className="space-y-4">
                <div className="bg-slate-800 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-400 mb-2">Почтовая доставка</h4>
                  <p className="text-slate-300 text-sm">Доставка через Почту Узбекистана и СДЭК</p>
                  <p className="text-slate-400 text-sm">Стоимость: от 800 USD</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-400 mb-2">Экспресс-доставка</h4>
                  <p className="text-slate-300 text-sm">Быстрая доставка в крупные города</p>
                  <p className="text-slate-400 text-sm">Стоимость: от 1200 USD</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Process */}
      <section className="py-16 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Как происходит доставка</h2>
            <p className="text-slate-300 text-lg">
              Простой и понятный процесс получения заказа
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Оформление заказа</h3>
              <p className="text-slate-300 text-sm">
                Выберите товары, укажите адрес доставки и контактные данные
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Подтверждение</h3>
              <p className="text-slate-300 text-sm">
                Менеджер свяжется с вами для подтверждения деталей заказа
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Отправка</h3>
              <p className="text-slate-300 text-sm">
                Заказ упаковывается и отправляется с уведомлением трек-номера
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">4</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Получение</h3>
              <p className="text-slate-300 text-sm">
                Вы получаете заказ и можете проверить товар перед оплатой
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Terms */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Условия доставки</h2>
            <p className="text-slate-300 text-lg">
              Важная информация о сроках, стоимости и особенностях доставки
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="bg-slate-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Clock className="h-6 w-6 text-blue-400 mr-2" />
                  Сроки доставки
                </h3>
                <ul className="space-y-2 text-slate-300">
                  <li>• <strong>Самарканд:</strong> 1-2 дня</li>
                  <li>• <strong>Самаркандская область:</strong> 2-3 дня</li>
                  <li>• <strong>Центральная Узбекистан:</strong> 3-5 дней</li>
                  <li>• <strong>Регионы:</strong> 5-7 дней</li>
                  <li>• <strong>При заказе от 50 000 USD:</strong> 7-10 дней</li>
                </ul>
              </div>

              <div className="bg-slate-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <CreditCard className="h-6 w-6 text-blue-400 mr-2" />
                  Стоимость доставки
                </h3>
                <ul className="space-y-2 text-slate-300">
                  <li>• <strong>Самовывоз:</strong> Бесплатно</li>
                  <li>• <strong>Самарканд:</strong> от 500 USD</li>
                  <li>• <strong>Самаркандская область:</strong> от 600 USD</li>
                  <li>• <strong>Регионы:</strong> от 800 USD</li>
                  <li>• <strong>При заказе от 50 000 USD:</strong> Бесплатно</li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Shield className="h-6 w-6 text-blue-400 mr-2" />
                  Безопасность
                </h3>
                <ul className="space-y-2 text-slate-300">
                  <li>• Страхование груза на сумму заказа</li>
                  <li>• Надежная упаковка товаров</li>
                  <li>• Возможность проверки перед оплатой</li>
                  <li>• Полная ответственность за сохранность</li>
                </ul>
              </div>

              <div className="bg-slate-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <CheckCircle className="h-6 w-6 text-blue-400 mr-2" />
                  Особенности
                </h3>
                <ul className="space-y-2 text-slate-300">
                  <li>• Отслеживание статуса заказа</li>
                  <li>• SMS и email уведомления</li>
                  <li>• Возможность изменения адреса</li>
                  <li>• Контроль качества при получении</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Часто задаваемые вопросы</h2>
            <p className="text-slate-300 text-lg">
              Ответы на популярные вопросы о доставке
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-slate-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">Можно ли изменить адрес доставки?</h3>
                <p className="text-slate-300">
                  Да, вы можете изменить адрес доставки до момента отправки заказа. 
                  Свяжитесь с нашим менеджером по телефону +998(33)433-44-04.
                </p>
              </div>

              <div className="bg-slate-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">Что делать, если товар поврежден?</h3>
                <p className="text-slate-300">
                  При получении поврежденного товара откажитесь от него и сообщите нам. 
                  Мы отправим замену бесплатно или вернем деньги.
                </p>
              </div>

              <div className="bg-slate-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">Можно ли заказать доставку в выходные?</h3>
                <p className="text-slate-300">
                  Курьерская доставка в Самарканде работает с понедельника по воскресенье. 
                  В регионах доставка осуществляется по рабочим дням.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">Как отследить заказ?</h3>
                <p className="text-slate-300">
                  После отправки мы пришлем трек-номер на ваш email и SMS. 
                  Вы можете отслеживать заказ на сайте транспортной компании.
                </p>
              </div>

              <div className="bg-slate-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">Есть ли доставка в отдаленные регионы?</h3>
                <p className="text-slate-300">
                  Да, мы доставляем товары по всей Узбекистану, включая отдаленные регионы. 
                  Стоимость и сроки уточняйте у менеджера.
                </p>
              </div>

              <div className="bg-slate-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">Можно ли заказать срочную доставку?</h3>
                <p className="text-slate-300">
                  Да, для Самарканда доступна доставка в день заказа. 
                  Стоимость срочной доставки уточняйте у менеджера.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact for Delivery */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Остались вопросы по доставке?
          </h2>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
            Наши менеджеры помогут рассчитать стоимость и сроки доставки для вашего региона
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
            >
              <Phone className="h-5 w-5 mr-2" />
              Позвонить нам
            </Link>
            <Link
              href="/contact"
              className="border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
            >
              <Mail className="h-5 w-5 mr-2" />
              Написать нам
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 border-t border-slate-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Image
                  src="/logo1.png"
                  alt="PCMarket"
                  width={32}
                  height={32}
                  className="h-8 w-auto"
                />
                <span className="text-xl font-bold text-blue-400">PCMarket</span>
              </div>
              <p className="text-slate-300">
                Ваш надежный партнер в мире компьютерных технологий
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Каталог</h4>
              <ul className="space-y-2 text-slate-300">
                <li><Link href="/products?type=computer" className="hover:text-blue-400 transition-colors">Компьютеры</Link></li>
                <li><Link href="/products?type=component" className="hover:text-blue-400 transition-colors">Комплектующие</Link></li>
                <li><Link href="/products?type=accessory" className="hover:text-blue-400 transition-colors">Аксессуары</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-slate-300">
                <li><Link href="/help" className="hover:text-blue-400 transition-colors">Помощь</Link></li>
                <li><Link href="/warranty" className="hover:text-blue-400 transition-colors">Гарантия</Link></li>
                <li><Link href="/delivery" className="hover:text-blue-400 transition-colors">Доставка</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-slate-300">
                <li>+998(33)433-44-04</li>
                <li>info@pcmarket.uz</li>
                <li>Samarkand, Amir Temur street, 123</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2025 PCMarket. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
