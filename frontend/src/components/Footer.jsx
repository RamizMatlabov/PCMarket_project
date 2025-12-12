'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from 'framer-motion';

export default function Footer() {
  const footerItems = [
    {
      title: 'Каталог',
      links: [
        { href: '/products?type=computer', label: 'Компьютеры' },
        { href: '/products?type=component', label: 'Комплектующие' },
        { href: '/products?type=accessory', label: 'Аксессуары' },
      ],
    },
    {
      title: 'Поддержка',
      links: [
        { href: '/help', label: 'Помощь' },
        { href: '/warranty', label: 'Гарантия' },
        { href: '/delivery', label: 'Доставка' },
      ],
    },
    {
      title: 'Контакты',
      items: [
        '+998(33)433-44-04',
        'info@pcmarket.uz',
        'Samarkand, Amir Temur street, 123',
      ],
    },
  ];

  return (
    <footer className="bg-slate-800 border-t border-slate-700 py-8 sm:py-10 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8"
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
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <motion.div
              className="flex items-center space-x-2 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <Image
                src="/logo1.png"
                alt="PCMarket"
                width={32}
                height={32}
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold text-blue-400">PCMarket</span>
            </motion.div>
            <p className="text-slate-300">
              Ваш надежный партнер в мире компьютерных технологий
            </p>
          </motion.div>
          {footerItems.map((section, index) => (
            <motion.div
              key={section.title}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
              {section.links ? (
                <ul className="space-y-2 text-slate-300">
                  {section.links.map((link) => (
                    <motion.li
                      key={link.href}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        href={link.href}
                        className="hover:text-blue-400 transition-colors inline-block"
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              ) : (
                <ul className="space-y-2 text-slate-300">
                  {section.items?.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          className="border-t border-slate-700 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-slate-400 text-sm sm:text-base"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p>&copy; 2025 PCMarket. Все права защищены.</p>
        </motion.div>
      </div>
    </footer>
  );
}
