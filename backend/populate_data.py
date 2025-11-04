#!/usr/bin/env python
import os
import sys
import django

# Add the project directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from products.models import Category, Product, ProductSpecification

def create_categories():
    categories_data = [
        {
            'name': 'Процессоры',
            'slug': 'processors',
            'description': 'Центральные процессоры для настольных компьютеров и серверов'
        },
        {
            'name': 'Видеокарты',
            'slug': 'graphics-cards',
            'description': 'Графические карты для игр и профессиональной работы'
        },
        {
            'name': 'Материнские платы',
            'slug': 'motherboards',
            'description': 'Основные платы для сборки компьютеров'
        },
        {
            'name': 'Оперативная память',
            'slug': 'ram',
            'description': 'Модули оперативной памяти DDR4 и DDR5'
        },
        {
            'name': 'Накопители',
            'slug': 'storage',
            'description': 'SSD и HDD накопители для хранения данных'
        },
        {
            'name': 'Блоки питания',
            'slug': 'power-supplies',
            'description': 'Блоки питания для стабильной работы системы'
        },
        {
            'name': 'Корпуса',
            'slug': 'cases',
            'description': 'Корпуса для системных блоков'
        },
        {
            'name': 'Охлаждение',
            'slug': 'cooling',
            'description': 'Системы охлаждения для процессоров и видеокарт'
        },
        {
            'name': 'Компьютеры',
            'slug': 'computers',
            'description': 'Готовые настольные компьютеры для работы и игр'
        },
        {
            'name': 'Моноблоки',
            'slug': 'all-in-one',
            'description': 'Моноблоки - компьютеры со встроенным монитором'
        },
        {
            'name': 'Ноутбуки',
            'slug': 'laptops',
            'description': 'Портативные компьютеры для работы и учебы'
        }
    ]
    
    categories = []
    for cat_data in categories_data:
        category, created = Category.objects.get_or_create(
            slug=cat_data['slug'],
            defaults=cat_data
        )
        categories.append(category)
        print(f"Category: {category.name} - {'Created' if created else 'Exists'}")
    
    return categories

def create_products(categories):
    products_data = [
        # Процессоры
        {
            'name': 'Intel Core i9-13900K',
            'slug': 'intel-core-i9-13900k',
            'description': 'Высокопроизводительный процессор Intel 13-го поколения с 24 ядрами',
            'price': 45000.00,
            'category': categories[0],  # Процессоры
            'product_type': 'component',
            'brand': 'Intel',
            'model': 'Core i9-13900K',
            'stock_quantity': 15,
            'specifications': [
                {'name': 'Ядра', 'value': '24 (8P + 16E)'},
                {'name': 'Потоки', 'value': '32'},
                {'name': 'Базовая частота', 'value': '3.0 ГГц'},
                {'name': 'Максимальная частота', 'value': '5.8 ГГц'},
                {'name': 'TDP', 'value': '125 Вт'},
                {'name': 'Сокет', 'value': 'LGA 1700'}
            ]
        },
        {
            'name': 'AMD Ryzen 9 7950X',
            'slug': 'amd-ryzen-9-7950x',
            'description': 'Флагманский процессор AMD с архитектурой Zen 4',
            'price': 42000.00,
            'category': categories[0],  # Процессоры
            'product_type': 'component',
            'brand': 'AMD',
            'model': 'Ryzen 9 7950X',
            'stock_quantity': 12,
            'specifications': [
                {'name': 'Ядра', 'value': '16'},
                {'name': 'Потоки', 'value': '32'},
                {'name': 'Базовая частота', 'value': '4.5 ГГц'},
                {'name': 'Максимальная частота', 'value': '5.7 ГГц'},
                {'name': 'TDP', 'value': '170 Вт'},
                {'name': 'Сокет', 'value': 'AM5'}
            ]
        },
        
        # Видеокарты
        {
            'name': 'NVIDIA GeForce RTX 4090',
            'slug': 'nvidia-geforce-rtx-4090',
            'description': 'Топовая видеокарта NVIDIA с архитектурой Ada Lovelace',
            'price': 150000.00,
            'category': categories[1],  # Видеокарты
            'product_type': 'component',
            'brand': 'NVIDIA',
            'model': 'GeForce RTX 4090',
            'stock_quantity': 8,
            'specifications': [
                {'name': 'Видеопамять', 'value': '24 ГБ GDDR6X'},
                {'name': 'Шина памяти', 'value': '384 бит'},
                {'name': 'Базовая частота', 'value': '2230 МГц'},
                {'name': 'Boost частота', 'value': '2520 МГц'},
                {'name': 'TDP', 'value': '450 Вт'},
                {'name': 'Интерфейс', 'value': 'PCIe 4.0 x16'}
            ]
        },
        {
            'name': 'AMD Radeon RX 7900 XTX',
            'slug': 'amd-radeon-rx-7900-xtx',
            'description': 'Флагманская видеокарта AMD с архитектурой RDNA 3',
            'price': 85000.00,
            'category': categories[1],  # Видеокарты
            'product_type': 'component',
            'brand': 'AMD',
            'model': 'Radeon RX 7900 XTX',
            'stock_quantity': 10,
            'specifications': [
                {'name': 'Видеопамять', 'value': '24 ГБ GDDR6'},
                {'name': 'Шина памяти', 'value': '384 бит'},
                {'name': 'Базовая частота', 'value': '1900 МГц'},
                {'name': 'Boost частота', 'value': '2500 МГц'},
                {'name': 'TDP', 'value': '355 Вт'},
                {'name': 'Интерфейс', 'value': 'PCIe 4.0 x16'}
            ]
        },
        
        # Материнские платы
        {
            'name': 'ASUS ROG Strix Z790-E Gaming WiFi',
            'slug': 'asus-rog-strix-z790-e-gaming-wifi',
            'description': 'Премиальная материнская плата для Intel 13-го поколения',
            'price': 25000.00,
            'category': categories[2],  # Материнские платы
            'product_type': 'component',
            'brand': 'ASUS',
            'model': 'ROG Strix Z790-E Gaming WiFi',
            'stock_quantity': 20,
            'specifications': [
                {'name': 'Сокет', 'value': 'LGA 1700'},
                {'name': 'Чипсет', 'value': 'Intel Z790'},
                {'name': 'Форм-фактор', 'value': 'ATX'},
                {'name': 'Память', 'value': 'DDR5 до 128 ГБ'},
                {'name': 'Слоты PCIe', 'value': '3x PCIe 5.0 x16'},
                {'name': 'WiFi', 'value': 'WiFi 6E'}
            ]
        },
        
        # Оперативная память
        {
            'name': 'Corsair Vengeance RGB 32GB DDR5-5600',
            'slug': 'corsair-vengeance-rgb-32gb-ddr5-5600',
            'description': 'Высокоскоростная оперативная память с RGB подсветкой',
            'price': 12000.00,
            'category': categories[3],  # Оперативная память
            'product_type': 'component',
            'brand': 'Corsair',
            'model': 'Vengeance RGB 32GB DDR5-5600',
            'stock_quantity': 25,
            'specifications': [
                {'name': 'Объем', 'value': '32 ГБ (2x16 ГБ)'},
                {'name': 'Тип', 'value': 'DDR5'},
                {'name': 'Частота', 'value': '5600 МГц'},
                {'name': 'Тайминги', 'value': 'CL36'},
                {'name': 'Напряжение', 'value': '1.25 В'},
                {'name': 'Подсветка', 'value': 'RGB'}
            ]
        },
        
        # Накопители
        {
            'name': 'Samsung 980 PRO 2TB NVMe SSD',
            'slug': 'samsung-980-pro-2tb-nvme-ssd',
            'description': 'Высокоскоростной NVMe SSD для профессионального использования',
            'price': 18000.00,
            'category': categories[4],  # Накопители
            'product_type': 'component',
            'brand': 'Samsung',
            'model': '980 PRO 2TB',
            'stock_quantity': 30,
            'specifications': [
                {'name': 'Емкость', 'value': '2 ТБ'},
                {'name': 'Интерфейс', 'value': 'PCIe 4.0 x4 NVMe'},
                {'name': 'Скорость чтения', 'value': '7000 МБ/с'},
                {'name': 'Скорость записи', 'value': '5000 МБ/с'},
                {'name': 'Тип памяти', 'value': '3D NAND TLC'},
                {'name': 'Ресурс записи', 'value': '1200 TBW'}
            ]
        },
        
        # Блоки питания
        {
            'name': 'Corsair RM1000x 1000W 80+ Gold',
            'slug': 'corsair-rm1000x-1000w-80-gold',
            'description': 'Модульный блок питания с сертификацией 80+ Gold',
            'price': 15000.00,
            'category': categories[5],  # Блоки питания
            'product_type': 'component',
            'brand': 'Corsair',
            'model': 'RM1000x',
            'stock_quantity': 18,
            'specifications': [
                {'name': 'Мощность', 'value': '1000 Вт'},
                {'name': 'Сертификация', 'value': '80+ Gold'},
                {'name': 'Модульность', 'value': 'Полностью модульный'},
                {'name': 'Вентилятор', 'value': '140мм с нулевым RPM'},
                {'name': 'Разъемы', 'value': '2x EPS, 6x PCIe'},
                {'name': 'Гарантия', 'value': '10 лет'}
            ]
        },
        
        # Корпуса
        {
            'name': 'Fractal Design Define 7 XL',
            'slug': 'fractal-design-define-7-xl',
            'description': 'Просторный корпус для высокопроизводительных систем',
            'price': 12000.00,
            'category': categories[6],  # Корпуса
            'product_type': 'component',
            'brand': 'Fractal Design',
            'model': 'Define 7 XL',
            'stock_quantity': 15,
            'specifications': [
                {'name': 'Форм-фактор', 'value': 'E-ATX, ATX, mATX, mini-ITX'},
                {'name': 'Материал', 'value': 'Сталь + алюминий'},
                {'name': 'Слоты расширения', 'value': '8'},
                {'name': 'Отсеки 3.5"', 'value': '6'},
                {'name': 'Отсеки 2.5"', 'value': '2'},
                {'name': 'Вентиляторы', 'value': '2x 140мм (в комплекте)'}
            ]
        },
        
        # Охлаждение
        {
            'name': 'Noctua NH-D15 chromax.black',
            'slug': 'noctua-nh-d15-chromax-black',
            'description': 'Топовый башенный кулер с двумя вентиляторами',
            'price': 8000.00,
            'category': categories[7],  # Охлаждение
            'product_type': 'component',
            'brand': 'Noctua',
            'model': 'NH-D15 chromax.black',
            'stock_quantity': 22,
            'specifications': [
                {'name': 'Тип', 'value': 'Башенный кулер'},
                {'name': 'Высота', 'value': '165 мм'},
                {'name': 'Вентиляторы', 'value': '2x NF-A15 PWM'},
                {'name': 'TDP', 'value': '220 Вт'},
                {'name': 'Сокеты', 'value': 'Intel LGA1700, AMD AM5'},
                {'name': 'Уровень шума', 'value': 'до 24.6 дБ(А)'}
            ]
        },
        
        # Компьютеры
        {
            'name': 'Gaming PC Intel Core i9-13900K + RTX 4090',
            'slug': 'gaming-pc-intel-i9-rtx4090',
            'description': 'Мощный игровой компьютер с топовым процессором и видеокартой',
            'price': 250000.00,
            'category': categories[8],  # Компьютеры
            'product_type': 'computer',
            'brand': 'Custom Build',
            'model': 'Gaming Pro X',
            'stock_quantity': 5,
            'specifications': [
                {'name': 'Процессор', 'value': 'Intel Core i9-13900K'},
                {'name': 'Видеокарта', 'value': 'NVIDIA GeForce RTX 4090 24GB'},
                {'name': 'Оперативная память', 'value': '32GB DDR5-5600'},
                {'name': 'Накопитель', 'value': '2TB NVMe SSD'},
                {'name': 'Блок питания', 'value': '1000W 80+ Gold'},
                {'name': 'Корпус', 'value': 'Fractal Design Define 7 XL'}
            ]
        },
        {
            'name': 'Workstation PC AMD Ryzen 9 7950X',
            'slug': 'workstation-pc-amd-ryzen-9',
            'description': 'Профессиональная рабочая станция для дизайна и рендеринга',
            'price': 180000.00,
            'category': categories[8],  # Компьютеры
            'product_type': 'computer',
            'brand': 'Custom Build',
            'model': 'Workstation Elite',
            'stock_quantity': 8,
            'specifications': [
                {'name': 'Процессор', 'value': 'AMD Ryzen 9 7950X'},
                {'name': 'Видеокарта', 'value': 'AMD Radeon RX 7900 XTX 24GB'},
                {'name': 'Оперативная память', 'value': '64GB DDR5-5600'},
                {'name': 'Накопитель', 'value': '2TB NVMe SSD + 4TB HDD'},
                {'name': 'Блок питания', 'value': '1000W 80+ Gold'},
                {'name': 'Корпус', 'value': 'Fractal Design Define 7 XL'}
            ]
        },
        {
            'name': 'Gaming PC AMD Ryzen 9 + RTX 4090',
            'slug': 'gaming-pc-amd-ryzen-rtx4090',
            'description': 'Высокопроизводительный игровой компьютер на базе AMD',
            'price': 240000.00,
            'category': categories[8],  # Компьютеры
            'product_type': 'computer',
            'brand': 'Custom Build',
            'model': 'Gaming Ultra',
            'stock_quantity': 6,
            'specifications': [
                {'name': 'Процессор', 'value': 'AMD Ryzen 9 7950X'},
                {'name': 'Видеокарта', 'value': 'NVIDIA GeForce RTX 4090 24GB'},
                {'name': 'Оперативная память', 'value': '32GB DDR5-5600'},
                {'name': 'Накопитель', 'value': '2TB NVMe SSD'},
                {'name': 'Блок питания', 'value': '1000W 80+ Gold'},
                {'name': 'Охлаждение', 'value': 'Noctua NH-D15'}
            ]
        },
        
        # Моноблоки
        {
            'name': 'Apple iMac 24" M3',
            'slug': 'apple-imac-24-m3',
            'description': 'Современный моноблок от Apple с чипом M3',
            'price': 150000.00,
            'category': categories[9],  # Моноблоки
            'product_type': 'computer',
            'brand': 'Apple',
            'model': 'iMac 24" M3',
            'stock_quantity': 10,
            'specifications': [
                {'name': 'Процессор', 'value': 'Apple M3'},
                {'name': 'Память', 'value': '16GB Unified Memory'},
                {'name': 'Накопитель', 'value': '512GB SSD'},
                {'name': 'Экран', 'value': '24" 4.5K Retina Display'},
                {'name': 'Графика', 'value': '10-core GPU'},
                {'name': 'Операционная система', 'value': 'macOS Sonoma'}
            ]
        },
        {
            'name': 'HP Pavilion All-in-One 27',
            'slug': 'hp-pavilion-all-in-one-27',
            'description': 'Моноблок с большим экраном для работы и развлечений',
            'price': 90000.00,
            'category': categories[9],  # Моноблоки
            'product_type': 'computer',
            'brand': 'HP',
            'model': 'Pavilion All-in-One 27',
            'stock_quantity': 12,
            'specifications': [
                {'name': 'Процессор', 'value': 'Intel Core i7-13700'},
                {'name': 'Память', 'value': '16GB DDR4'},
                {'name': 'Накопитель', 'value': '512GB SSD + 1TB HDD'},
                {'name': 'Экран', 'value': '27" Full HD IPS'},
                {'name': 'Графика', 'value': 'Intel UHD Graphics 770'},
                {'name': 'Операционная система', 'value': 'Windows 11'}
            ]
        },
        {
            'name': 'Lenovo IdeaCentre AIO 5 27',
            'slug': 'lenovo-ideacentre-aio-5-27',
            'description': 'Стильный моноблок для дома и офиса',
            'price': 85000.00,
            'category': categories[9],  # Моноблоки
            'product_type': 'computer',
            'brand': 'Lenovo',
            'model': 'IdeaCentre AIO 5 27',
            'stock_quantity': 15,
            'specifications': [
                {'name': 'Процессор', 'value': 'AMD Ryzen 7 7730U'},
                {'name': 'Память', 'value': '16GB DDR4'},
                {'name': 'Накопитель', 'value': '512GB SSD'},
                {'name': 'Экран', 'value': '27" QHD IPS'},
                {'name': 'Графика', 'value': 'AMD Radeon Graphics'},
                {'name': 'Операционная система', 'value': 'Windows 11'}
            ]
        },
        
        # Ноутбуки
        {
            'name': 'ASUS ROG Strix G18',
            'slug': 'asus-rog-strix-g18',
            'description': 'Игровой ноутбук с топовой производительностью',
            'price': 180000.00,
            'category': categories[10],  # Ноутбуки
            'product_type': 'computer',
            'brand': 'ASUS',
            'model': 'ROG Strix G18',
            'stock_quantity': 7,
            'specifications': [
                {'name': 'Процессор', 'value': 'Intel Core i9-13980HX'},
                {'name': 'Видеокарта', 'value': 'NVIDIA GeForce RTX 4090 16GB'},
                {'name': 'Память', 'value': '32GB DDR5'},
                {'name': 'Накопитель', 'value': '1TB NVMe SSD'},
                {'name': 'Экран', 'value': '18" QHD 240Hz'},
                {'name': 'Операционная система', 'value': 'Windows 11'}
            ]
        },
        {
            'name': 'MacBook Pro 16" M3 Max',
            'slug': 'macbook-pro-16-m3-max',
            'description': 'Профессиональный ноутбук от Apple для творческих задач',
            'price': 280000.00,
            'category': categories[10],  # Ноутбуки
            'product_type': 'computer',
            'brand': 'Apple',
            'model': 'MacBook Pro 16" M3 Max',
            'stock_quantity': 5,
            'specifications': [
                {'name': 'Процессор', 'value': 'Apple M3 Max'},
                {'name': 'Память', 'value': '36GB Unified Memory'},
                {'name': 'Накопитель', 'value': '1TB SSD'},
                {'name': 'Экран', 'value': '16.2" Liquid Retina XDR'},
                {'name': 'Графика', 'value': '40-core GPU'},
                {'name': 'Операционная система', 'value': 'macOS Sonoma'}
            ]
        },
        {
            'name': 'Lenovo ThinkPad X1 Carbon Gen 11',
            'slug': 'lenovo-thinkpad-x1-carbon-gen11',
            'description': 'Премиальный бизнес-ноутбук для профессионалов',
            'price': 120000.00,
            'category': categories[10],  # Ноутбуки
            'product_type': 'computer',
            'brand': 'Lenovo',
            'model': 'ThinkPad X1 Carbon Gen 11',
            'stock_quantity': 10,
            'specifications': [
                {'name': 'Процессор', 'value': 'Intel Core i7-1355U'},
                {'name': 'Память', 'value': '16GB LPDDR5'},
                {'name': 'Накопитель', 'value': '512GB NVMe SSD'},
                {'name': 'Экран', 'value': '14" WUXGA IPS'},
                {'name': 'Графика', 'value': 'Intel Iris Xe Graphics'},
                {'name': 'Операционная система', 'value': 'Windows 11 Pro'}
            ]
        },
        {
            'name': 'Dell XPS 15',
            'slug': 'dell-xps-15',
            'description': 'Универсальный ноутбук для работы и творчества',
            'price': 140000.00,
            'category': categories[10],  # Ноутбуки
            'product_type': 'computer',
            'brand': 'Dell',
            'model': 'XPS 15',
            'stock_quantity': 8,
            'specifications': [
                {'name': 'Процессор', 'value': 'Intel Core i7-13700H'},
                {'name': 'Видеокарта', 'value': 'NVIDIA GeForce RTX 4050 6GB'},
                {'name': 'Память', 'value': '32GB DDR5'},
                {'name': 'Накопитель', 'value': '1TB NVMe SSD'},
                {'name': 'Экран', 'value': '15.6" 3.5K OLED'},
                {'name': 'Операционная система', 'value': 'Windows 11'}
            ]
        }
    ]
    
    for product_data in products_data:
        specifications = product_data.pop('specifications', [])
        
        product, created = Product.objects.get_or_create(
            slug=product_data['slug'],
            defaults=product_data
        )
        
        if created:
            # Create specifications
            for spec_data in specifications:
                ProductSpecification.objects.create(
                    product=product,
                    name=spec_data['name'],
                    value=spec_data['value']
                )
        
        print(f"Product: {product.name} - {'Created' if created else 'Exists'}")

def main():
    print("Creating categories...")
    categories = create_categories()
    
    print("\nCreating products...")
    create_products(categories)
    
    print("\nData population completed!")

if __name__ == '__main__':
    main()
