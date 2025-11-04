# Инструкция по добавлению изображений товаров

## Способ 1: Использование скрипта (Рекомендуется)

1. Поместите изображения компьютеров, моноблоков и ноутбуков в эту папку
2. Имена файлов должны соответствовать slug товаров (например, `gaming-pc-intel-i9-rtx4090.png`)
3. Запустите скрипт:
   ```bash
   python upload_product_images.py
   ```

## Список необходимых изображений:

### Компьютеры:
- `gaming-pc-intel-i9-rtx4090.png` - Gaming PC Intel Core i9-13900K + RTX 4090
- `workstation-pc-amd-ryzen-9.png` - Workstation PC AMD Ryzen 9 7950X
- `gaming-pc-amd-ryzen-rtx4090.png` - Gaming PC AMD Ryzen 9 + RTX 4090

### Моноблоки:
- `apple-imac-24-m3.png` - Apple iMac 24" M3
- `hp-pavilion-all-in-one-27.png` - HP Pavilion All-in-One 27
- `lenovo-ideacentre-aio-5-27.png` - Lenovo IdeaCentre AIO 5 27

### Ноутбуки:
- `asus-rog-strix-g18.png` - ASUS ROG Strix G18
- `macbook-pro-16-m3-max.png` - MacBook Pro 16" M3 Max
- `lenovo-thinkpad-x1-carbon-gen11.png` - Lenovo ThinkPad X1 Carbon Gen 11
- `dell-xps-15.png` - Dell XPS 15

## Поддерживаемые форматы:
- PNG (.png)
- JPEG (.jpg, .jpeg)
- WebP (.webp)

## Способ 2: Через админ-панель Django

1. Запустите сервер: `python manage.py runserver`
2. Откройте http://localhost:8000/admin/
3. Войдите в админ-панель
4. Перейдите в Products → выберите товар → загрузите изображение

## Способ 3: Прямое копирование (для опытных)

1. Скопируйте изображения напрямую в `backend/media/products/`
2. Имена файлов должны соответствовать slug товаров
3. Обновите базу данных через админ-панель или Django shell

