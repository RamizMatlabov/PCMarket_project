'use client';

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Shield, Clock, CheckCircle, XCircle, AlertTriangle, FileText, Phone, Mail, Settings, Package, Award } from 'lucide-react';

export default function WarrantyPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
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

            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="flex items-center text-white hover:text-blue-400 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                На главную
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Гарантийные <span className="text-blue-400">обязательства</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Официальная гарантия на все товары с полным сервисным обслуживанием
            </p>
          </div>
        </div>
      </section>

      {/* Warranty Overview */}
      <section className="py-16 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Гарантийные условия</h2>
            <p className="text-slate-300 text-lg">
              Мы предоставляем официальную гарантию производителя на все товары
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-slate-700 rounded-lg p-6 text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Официальная гарантия</h3>
              <p className="text-slate-300">
                Все товары имеют официальную гарантию производителя от 12 до 36 месяцев
              </p>
            </div>

            <div className="bg-slate-700 rounded-lg p-6 text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Settings className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Сервисный центр</h3>
              <p className="text-slate-300">
                Собственный сервисный центр с современным оборудованием и квалифицированными мастерами
              </p>
            </div>

            <div className="bg-slate-700 rounded-lg p-6 text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Качественный сервис</h3>
              <p className="text-slate-300">
                Быстрое решение проблем с заменой или ремонтом неисправного оборудования
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Warranty Terms */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Сроки гарантии</h2>
            <p className="text-slate-300 text-lg">
              Гарантийные обязательства по категориям товаров
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-slate-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Package className="h-6 w-6 text-blue-400 mr-2" />
                  Компьютеры и ноутбуки
                </h3>
                <ul className="space-y-2 text-slate-300">
                  <li>• <strong>Готовые ПК:</strong> 24 месяца</li>
                  <li>• <strong>Ноутбуки:</strong> 12-24 месяца</li>
                  <li>• <strong>Моноблоки:</strong> 24 месяца</li>
                  <li>• <strong>Серверы:</strong> 36 месяцев</li>
                </ul>
              </div>

              <div className="bg-slate-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Settings className="h-6 w-6 text-blue-400 mr-2" />
                  Комплектующие
                </h3>
                <ul className="space-y-2 text-slate-300">
                  <li>• <strong>Процессоры:</strong> 36 месяцев</li>
                  <li>• <strong>Материнские платы:</strong> 36 месяцев</li>
                  <li>• <strong>Видеокарты:</strong> 24-36 месяцев</li>
                  <li>• <strong>Память:</strong> Пожизненная</li>
                  <li>• <strong>Накопители:</strong> 60 месяцев</li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Shield className="h-6 w-6 text-blue-400 mr-2" />
                  Периферия
                </h3>
                <ul className="space-y-2 text-slate-300">
                  <li>• <strong>Мониторы:</strong> 24-36 месяцев</li>
                  <li>• <strong>Клавиатуры:</strong> 12 месяцев</li>
                  <li>• <strong>Мыши:</strong> 12 месяцев</li>
                  <li>• <strong>Колонки:</strong> 24 месяца</li>
                  <li>• <strong>Принтеры:</strong> 12-24 месяца</li>
                </ul>
              </div>

              <div className="bg-slate-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Clock className="h-6 w-6 text-blue-400 mr-2" />
                  Сетевые устройства
                </h3>
                <ul className="space-y-2 text-slate-300">
                  <li>• <strong>Роутеры:</strong> 24 месяца</li>
                  <li>• <strong>Сетевые карты:</strong> 24 месяца</li>
                  <li>• <strong>Кабели:</strong> 12 месяцев</li>
                  <li>• <strong>Коммутаторы:</strong> 36 месяцев</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Warranty Coverage */}
      <section className="py-16 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Что покрывается гарантией</h2>
            <p className="text-slate-300 text-lg">
              Гарантийные случаи и условия обслуживания
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-green-400 flex items-center">
                <CheckCircle className="h-6 w-6 mr-2" />
                Покрывается гарантией
              </h3>
              <div className="space-y-4">
                <div className="bg-slate-700 rounded-lg p-4">
                  <h4 className="font-semibold text-green-400 mb-2">Производственные дефекты</h4>
                  <p className="text-slate-300 text-sm">
                    Неисправности, возникшие по вине производителя в процессе изготовления
                  </p>
                </div>
                <div className="bg-slate-700 rounded-lg p-4">
                  <h4 className="font-semibold text-green-400 mb-2">Скрытые дефекты</h4>
                  <p className="text-slate-300 text-sm">
                    Неисправности, которые невозможно обнаружить при обычном осмотре
                  </p>
                </div>
                <div className="bg-slate-700 rounded-lg p-4">
                  <h4 className="font-semibold text-green-400 mb-2">Преждевременный износ</h4>
                  <p className="text-slate-300 text-sm">
                    Износ деталей, не соответствующий нормальному сроку эксплуатации
                  </p>
                </div>
                <div className="bg-slate-700 rounded-lg p-4">
                  <h4 className="font-semibold text-green-400 mb-2">Программные сбои</h4>
                  <p className="text-slate-300 text-sm">
                    Ошибки в прошивке или программном обеспечении устройства
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-6 text-red-400 flex items-center">
                <XCircle className="h-6 w-6 mr-2" />
                Не покрывается гарантией
              </h3>
              <div className="space-y-4">
                <div className="bg-slate-700 rounded-lg p-4">
                  <h4 className="font-semibold text-red-400 mb-2">Механические повреждения</h4>
                  <p className="text-slate-300 text-sm">
                    Следы ударов, падений, царапины и другие физические повреждения
                  </p>
                </div>
                <div className="bg-slate-700 rounded-lg p-4">
                  <h4 className="font-semibold text-red-400 mb-2">Попадание жидкости</h4>
                  <p className="text-slate-300 text-sm">
                    Повреждения от попадания воды, кофе, соков и других жидкостей
                  </p>
                </div>
                <div className="bg-slate-700 rounded-lg p-4">
                  <h4 className="font-semibold text-red-400 mb-2">Неправильная эксплуатация</h4>
                  <p className="text-slate-300 text-sm">
                    Использование не по назначению или нарушение инструкций
                  </p>
                </div>
                <div className="bg-slate-700 rounded-lg p-4">
                  <h4 className="font-semibold text-red-400 mb-2">Расходные материалы</h4>
                  <p className="text-slate-300 text-sm">
                    Батареи, картриджи, диски и другие расходные элементы
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Warranty Process */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Как воспользоваться гарантией</h2>
            <p className="text-slate-300 text-lg">
              Пошаговая инструкция по обращению в сервисный центр
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Обращение</h3>
              <p className="text-slate-300 text-sm">
                Свяжитесь с нами по телефону или через форму на сайте
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Диагностика</h3>
              <p className="text-slate-300 text-sm">
                Принесите товар в сервисный центр для бесплатной диагностики
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Ремонт/Замена</h3>
              <p className="text-slate-300 text-sm">
                Выполняем ремонт или замену товара в зависимости от случая
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">4</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Возврат</h3>
              <p className="text-slate-300 text-sm">
                Возвращаем отремонтированный или новый товар
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Center Info */}
      <section className="py-16 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Сервисный центр</h2>
            <p className="text-slate-300 text-lg">
              Современное оборудование и квалифицированные специалисты
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Наши возможности</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Диагностика оборудования</h4>
                    <p className="text-slate-300 text-sm">
                      Полная диагностика компьютеров, ноутбуков и комплектующих
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Ремонт материнских плат</h4>
                    <p className="text-slate-300 text-sm">
                      Замена чипов, восстановление цепей питания и разъемов
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Восстановление данных</h4>
                    <p className="text-slate-300 text-sm">
                      Восстановление данных с поврежденных накопителей
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Замена экранов</h4>
                    <p className="text-slate-300 text-sm">
                      Замена экранов ноутбуков, мониторов и планшетов
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-6">Контактная информация</h3>
              <div className="bg-slate-700 rounded-lg p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-blue-400" />
                    <div>
                      <p className="font-semibold">Телефон сервиса</p>
                      <p className="text-slate-300">+998(33)433-44-04</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-blue-400" />
                    <div>
                      <p className="font-semibold">Email сервиса</p>
                      <p className="text-slate-300">service@pcmarket.uz</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Settings className="h-5 w-5 text-blue-400" />
                    <div>
                      <p className="font-semibold">Адрес сервиса</p>
                      <p className="text-slate-300">Samarkand, Amir Temur street, 123</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-blue-400" />
                    <div>
                      <p className="font-semibold">Часы работы</p>
                      <p className="text-slate-300">Пн-Пт: 9:00 - 18:00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Часто задаваемые вопросы</h2>
            <p className="text-slate-300 text-lg">
              Ответы на популярные вопросы о гарантии
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-slate-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">Как проверить, действует ли гарантия?</h3>
                <p className="text-slate-300">
                  Гарантия действует с момента покупки товара. Срок указан в гарантийном талоне 
                  и на упаковке товара. Также можно уточнить у нашего менеджера.
                </p>
              </div>

              <div className="bg-slate-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">Нужно ли сохранять упаковку?</h3>
                <p className="text-slate-300">
                  Упаковку желательно сохранить, но это не является обязательным условием. 
                  Главное - сохранить чек и гарантийный талон.
                </p>
              </div>

              <div className="bg-slate-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">Сколько времени занимает ремонт?</h3>
                <p className="text-slate-300">
                  Обычно ремонт занимает от 3 до 14 дней в зависимости от сложности неисправности 
                  и наличия запчастей. Точные сроки сообщаются после диагностики.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">Можно ли продлить гарантию?</h3>
                <p className="text-slate-300">
                  Да, мы предлагаем расширенную гарантию на многие товары. 
                  Подробности уточняйте у менеджера при покупке.
                </p>
              </div>

              <div className="bg-slate-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">Что делать, если товар сломался в гарантийный период?</h3>
                <p className="text-slate-300">
                  Обратитесь в наш сервисный центр с товаром, чеком и гарантийным талоном. 
                  Мы проведем диагностику и при необходимости отремонтируем или заменим товар.
                </p>
              </div>

              <div className="bg-slate-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">Есть ли гарантия на ремонт?</h3>
                <p className="text-slate-300">
                  Да, на все выполненные ремонтные работы предоставляется гарантия 6 месяцев 
                  или до окончания гарантийного срока товара.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact for Warranty */}
      <section className="py-16 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Нужна помощь с гарантией?
          </h2>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
            Наши специалисты помогут решить любые вопросы, связанные с гарантийным обслуживанием
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
            >
              <Phone className="h-5 w-5 mr-2" />
              Позвонить в сервис
            </Link>
            <Link
              href="/contact"
              className="border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
            >
              <FileText className="h-5 w-5 mr-2" />
              Оставить заявку
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
                  src="/logo.svg"
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
            <p>&copy; 2024 PCMarket. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
