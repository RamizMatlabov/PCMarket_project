# PCMarket - Интернет-магазин компьютерных товаров

Современный интернет-магазин компьютерных товаров, построенный на Next.js и Django.

## 🚀 Технологии

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend**: Django 5.2, Django REST Framework
- **База данных**: SQLite (для разработки)
- **UI компоненты**: Lucide React, Headless UI

## 📋 Функциональность

- ✅ Каталог товаров с фильтрацией и поиском
- ✅ Корзина покупок
- ✅ Оформление заказов
- ✅ Админ-панель для управления товарами
- ✅ Адаптивный дизайн
- ✅ Современный UI с логотипом PCMarket

## 🛠 Установка и запуск

### Предварительные требования

- Node.js 18+ 
- Python 3.8+
- pip

### 1. Клонирование репозитория

```bash
git clone <repository-url>
cd PCMarket_project
```

### 2. Настройка Backend (Django)

```bash
cd backend

# Установка зависимостей
pip install django djangorestframework django-cors-headers psycopg2-binary pillow django-filter

# Применение миграций
python manage.py migrate

# Создание суперпользователя (опционально)
python manage.py createsuperuser

# Заполнение базы данных тестовыми данными
python populate_data.py

# Запуск сервера разработки
python manage.py runserver
```

Backend будет доступен по адресу: http://localhost:8000

### 3. Настройка Frontend (Next.js)

```bash
cd frontend

# Установка зависимостей
npm install

# Запуск сервера разработки
npm run dev
```

Frontend будет доступен по адресу: http://localhost:3000

## 📁 Структура проекта

```
PCMarket_project/
├── backend/                 # Django backend
│   ├── backend/            # Основные настройки Django
│   ├── products/           # Приложение товаров
│   ├── orders/             # Приложение заказов
│   ├── manage.py
│   └── populate_data.py    # Скрипт заполнения БД
├── frontend/               # Next.js frontend
│   ├── src/
│   │   └── app/           # App Router страницы
│   │       ├── page.tsx   # Главная страница
│   │       ├── products/  # Каталог товаров
│   │       ├── cart/      # Корзина
│   │       └── checkout/  # Оформление заказа
│   └── public/
│       └── logo.svg       # Логотип PCMarket
└── README.md
```

## 🎨 Дизайн

Проект использует современный темный дизайн с синими акцентами, соответствующий тематике компьютерных технологий. Логотип PCMarket выполнен в стиле светящегося монитора.

## 🔧 API Endpoints

### Товары
- `GET /api/products/products/` - Список товаров
- `GET /api/products/products/{slug}/` - Детали товара
- `GET /api/products/categories/` - Список категорий
- `GET /api/products/featured/` - Популярные товары

### Заказы
- `POST /api/orders/create-order/` - Создание заказа
- `GET /api/orders/orders/{id}/` - Детали заказа

## 👨‍💼 Админ-панель

Доступна по адресу: http://localhost:8000/admin

Логин: admin
Пароль: admin123

## 🚀 Развертывание

### Backend (Django)
1. Настройте PostgreSQL для продакшена
2. Обновите настройки в `backend/settings.py`
3. Соберите статические файлы: `python manage.py collectstatic`
4. Запустите с помощью Gunicorn

### Frontend (Next.js)
1. Соберите проект: `npm run build`
2. Запустите: `npm start`
3. Или разверните на Vercel/Netlify

## 📝 Лицензия

MIT License

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте ветку для новой функции
3. Внесите изменения
4. Создайте Pull Request

## 📞 Поддержка

Если у вас есть вопросы или предложения, создайте Issue в репозитории.