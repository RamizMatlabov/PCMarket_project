'use client';

import Image from "next/image";
import Link from "next/link";
import { Users, Award, Target, Heart, Shield, Clock, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import Footer from '../../components/Footer';
import { TextReveal } from '../../components/animations/TextReveal';
import { GlareCard } from '../../components/animations/CardHover';
import { HoverBorderGradient } from '../../components/animations/ButtonAnimations';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <TextReveal delay={0.2}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-2">
                О компании <span className="text-blue-400">PCMarket</span>
              </h1>
            </TextReveal>
            <TextReveal delay={0.4}>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-300 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
                Мы — ведущий поставщик компьютерной техники и комплектующих в Узбекистане, 
                работающий с 2010 года
              </p>
            </TextReveal>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-8 sm:py-12 md:py-16 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Наша история</h2>
              <div className="space-y-4 text-slate-300">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  PCMarket была основана в 2010 году группой энтузиастов компьютерных технологий. 
                  Начиная с небольшого магазина в Самарканде, мы выросли до крупнейшей сети 
                  компьютерных магазинов в Узбекистане.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  За 14 лет работы мы обслужили более 2 миллионов клиентов и стали 
                  официальными партнерами ведущих мировых производителей: Intel, AMD, 
                  NVIDIA, ASUS, MSI, Corsair и многих других.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  Наша миссия — сделать передовые компьютерные технологии доступными 
                  каждому, от новичков до профессионалов.
                </motion.p>
              </div>
            </motion.div>
            <motion.div
              className="bg-slate-700 rounded-lg p-8"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="grid grid-cols-2 gap-6 text-center">
                {[
                  { value: '2M+', label: 'Довольных клиентов' },
                  { value: '500+', label: 'Городов Узбекистана' },
                  { value: '50K+', label: 'Товаров в каталоге' },
                  { value: '14', label: 'Лет на рынке' },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="text-3xl font-bold text-blue-400 mb-2">{stat.value}</div>
                    <div className="text-slate-300">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-8 sm:py-12 md:py-16 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TextReveal>
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Наши ценности</h2>
              <p className="text-slate-300 text-sm sm:text-base md:text-lg">
                Принципы, которыми мы руководствуемся в работе
              </p>
            </div>
          </TextReveal>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
          >
            {[
              { icon: Shield, title: 'Качество', text: 'Мы работаем только с проверенными поставщиками и предлагаем исключительно оригинальную продукцию' },
              { icon: Heart, title: 'Клиентоориентированность', text: 'Каждый клиент важен для нас. Мы стремимся к долгосрочным отношениям и максимальному удовлетворению потребностей' },
              { icon: Target, title: 'Инновации', text: 'Мы следим за последними тенденциями в IT-индустрии и первыми предлагаем новейшие технологии' },
              { icon: Clock, title: 'Надежность', text: 'Стабильная работа, соблюдение сроков и выполнение обязательств — основа нашего бизнеса' },
              { icon: Users, title: 'Команда', text: 'Наши сотрудники — это профессионалы с многолетним опытом в сфере компьютерных технологий' },
              { icon: Award, title: 'Экспертиза', text: 'Мы не просто продаем товары, а помогаем выбрать оптимальное решение для каждой задачи' },
            ].map((value, index) => (
              <motion.div
                key={index}
                className="text-center"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -10 }}
              >
                <motion.div
                  className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <value.icon className="h-8 w-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-slate-300">{value.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TextReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Наша команда</h2>
              <p className="text-slate-300 text-lg">
                Профессионалы, которые помогут вам выбрать лучшее решение
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
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            {[
              { icon: Users, title: 'Консультанты', text: 'Наши специалисты помогут подобрать оптимальную конфигурацию компьютера под ваши задачи' },
              { icon: Shield, title: 'Техническая поддержка', text: 'Квалифицированные инженеры решат любые технические вопросы и обеспечат послепродажное обслуживание' },
              { icon: Star, title: 'Менеджеры по продажам', text: 'Опытные менеджеры помогут оформить заказ и ответят на все вопросы о товарах и услугах' },
            ].map((team, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5 }}
              >
                <GlareCard className="bg-slate-700 rounded-lg p-6 text-center">
                  <motion.div
                    className="w-24 h-24 bg-slate-600 rounded-full mx-auto mb-4 flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <team.icon className="h-12 w-12 text-slate-400" />
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-2">{team.title}</h3>
                  <p className="text-slate-300">{team.text}</p>
                </GlareCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <TextReveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Готовы начать сотрудничество?
            </h2>
          </TextReveal>
          <TextReveal delay={0.2}>
            <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
              Присоединяйтесь к миллионам довольных клиентов PCMarket и получите 
              доступ к лучшим компьютерным технологиям
            </p>
          </TextReveal>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <HoverBorderGradient>
              <Link
                href="/products"
                className="block bg-slate-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Перейти в каталог
              </Link>
            </HoverBorderGradient>
            <Link
              href="/contact"
              className="border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">Связаться с нами</span>
              <motion.div
                className="absolute inset-0 bg-blue-400"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
