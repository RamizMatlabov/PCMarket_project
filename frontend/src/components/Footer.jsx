import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-800 border-t border-slate-700 py-8 sm:py-10 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
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
        <div className="border-t border-slate-700 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-slate-400 text-sm sm:text-base">
          <p>&copy; 2025 PCMarket. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
