'use client';

import Image from "next/image";
import Link from "next/link";
import { Users, Award, Target, Heart, Shield, Clock, Star } from 'lucide-react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              О компании <span className="text-blue-400">PCMarket</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Мы — ведущий поставщик компьютерной техники и комплектующих в Узбекистане, 
              работающий с 2010 года
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Наша история</h2>
              <div className="space-y-4 text-slate-300">
                <p>
                  PCMarket была основана в 2010 году группой энтузиастов компьютерных технологий. 
                  Начиная с небольшого магазина в Самарканде, мы выросли до крупнейшей сети 
                  компьютерных магазинов в Узбекистане.
                </p>
                <p>
                  За 14 лет работы мы обслужили более 2 миллионов клиентов и стали 
                  официальными партнерами ведущих мировых производителей: Intel, AMD, 
                  NVIDIA, ASUS, MSI, Corsair и многих других.
                </p>
                <p>
                  Наша миссия — сделать передовые компьютерные технологии доступными 
                  каждому, от новичков до профессионалов.
                </p>
              </div>
            </div>
            <div className="bg-slate-700 rounded-lg p-8">
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-400 mb-2">2M+</div>
                  <div className="text-slate-300">Довольных клиентов</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-400 mb-2">500+</div>
                  <div className="text-slate-300">Городов Узбекистана</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-400 mb-2">50K+</div>
                  <div className="text-slate-300">Товаров в каталоге</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-400 mb-2">14</div>
                  <div className="text-slate-300">Лет на рынке</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Наши ценности</h2>
            <p className="text-slate-300 text-lg">
              Принципы, которыми мы руководствуемся в работе
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Качество</h3>
              <p className="text-slate-300">
                Мы работаем только с проверенными поставщиками и предлагаем 
                исключительно оригинальную продукцию
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Клиентоориентированность</h3>
              <p className="text-slate-300">
                Каждый клиент важен для нас. Мы стремимся к долгосрочным 
                отношениям и максимальному удовлетворению потребностей
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Инновации</h3>
              <p className="text-slate-300">
                Мы следим за последними тенденциями в IT-индустрии и 
                первыми предлагаем новейшие технологии
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Надежность</h3>
              <p className="text-slate-300">
                Стабильная работа, соблюдение сроков и выполнение 
                обязательств — основа нашего бизнеса
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Команда</h3>
              <p className="text-slate-300">
                Наши сотрудники — это профессионалы с многолетним опытом 
                в сфере компьютерных технологий
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Экспертиза</h3>
              <p className="text-slate-300">
                Мы не просто продаем товары, а помогаем выбрать оптимальное 
                решение для каждой задачи
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Наша команда</h2>
            <p className="text-slate-300 text-lg">
              Профессионалы, которые помогут вам выбрать лучшее решение
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-slate-700 rounded-lg p-6 text-center">
              <div className="w-24 h-24 bg-slate-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="h-12 w-12 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Консультанты</h3>
              <p className="text-slate-300">
                Наши специалисты помогут подобрать оптимальную конфигурацию 
                компьютера под ваши задачи
              </p>
            </div>

            <div className="bg-slate-700 rounded-lg p-6 text-center">
              <div className="w-24 h-24 bg-slate-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-12 w-12 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Техническая поддержка</h3>
              <p className="text-slate-300">
                Квалифицированные инженеры решат любые технические вопросы 
                и обеспечат послепродажное обслуживание
              </p>
            </div>

            <div className="bg-slate-700 rounded-lg p-6 text-center">
              <div className="w-24 h-24 bg-slate-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Star className="h-12 w-12 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Менеджеры по продажам</h3>
              <p className="text-slate-300">
                Опытные менеджеры помогут оформить заказ и ответят на все 
                вопросы о товарах и услугах
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Готовы начать сотрудничество?
          </h2>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
            Присоединяйтесь к миллионам довольных клиентов PCMarket и получите 
            доступ к лучшим компьютерным технологиям
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Перейти в каталог
            </Link>
            <Link
              href="/contact"
              className="border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Связаться с нами
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
