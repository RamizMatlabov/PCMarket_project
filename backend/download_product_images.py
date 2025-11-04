#!/usr/bin/env python
"""
Скрипт для создания placeholder изображений для товаров
Использует Pillow для генерации изображений с текстом
"""
import os
import sys
import django
from PIL import Image, ImageDraw, ImageFont
import textwrap

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from products.models import Product

def create_product_image(product, output_path):
    """Создает изображение для товара"""
    # Размер изображения
    width, height = 800, 600
    
    # Создаем изображение с градиентом
    img = Image.new('RGB', (width, height), color='#1e293b')  # slate-900
    draw = ImageDraw.Draw(img)
    
    # Рисуем градиентный фон
    for y in range(height):
        r = int(30 + (y / height) * 20)
        g = int(41 + (y / height) * 20)
        b = int(59 + (y / height) * 20)
        draw.line([(0, y), (width, y)], fill=(r, g, b))
    
    # Рисуем рамку
    draw.rectangle([10, 10, width-10, height-10], outline='#3b82f6', width=3)
    
    # Текст товара
    try:
        # Пробуем использовать системный шрифт
        try:
            font_large = ImageFont.truetype("arial.ttf", 48)
            font_medium = ImageFont.truetype("arial.ttf", 32)
            font_small = ImageFont.truetype("arial.ttf", 24)
        except:
            try:
                font_large = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 48)
                font_medium = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 32)
                font_small = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 24)
            except:
                font_large = ImageFont.load_default()
                font_medium = ImageFont.load_default()
                font_small = ImageFont.load_default()
    except:
        font_large = ImageFont.load_default()
        font_medium = ImageFont.load_default()
        font_small = ImageFont.load_default()
    
    # Название категории
    category_text = product.category.name
    bbox = draw.textbbox((0, 0), category_text, font=font_small)
    text_width = bbox[2] - bbox[0]
    draw.text(((width - text_width) // 2, 50), category_text, 
              fill='#94a3b8', font=font_small)
    
    # Название товара (разбиваем на строки)
    product_name = product.name
    # Ограничиваем длину названия
    if len(product_name) > 40:
        product_name = product_name[:37] + "..."
    
    lines = textwrap.wrap(product_name, width=30)
    y_offset = 200
    for line in lines:
        bbox = draw.textbbox((0, 0), line, font=font_large)
        text_width = bbox[2] - bbox[0]
        draw.text(((width - text_width) // 2, y_offset), line, 
                  fill='#ffffff', font=font_large)
        y_offset += 60
    
    # Бренд и модель
    brand_model = f"{product.brand} {product.model}"
    bbox = draw.textbbox((0, 0), brand_model, font=font_medium)
    text_width = bbox[2] - bbox[0]
    draw.text(((width - text_width) // 2, y_offset + 20), brand_model, 
              fill='#60a5fa', font=font_medium)
    
    # Цена
    price_text = f"{int(product.price):,} USD"
    bbox = draw.textbbox((0, 0), price_text, font=font_medium)
    text_width = bbox[2] - bbox[0]
    draw.text(((width - text_width) // 2, height - 100), price_text, 
              fill='#10b981', font=font_medium)
    
    # Сохраняем изображение
    img.save(output_path, 'PNG', quality=95)
    return True

def generate_product_images():
    """Генерирует изображения для всех товаров без изображений"""
    # Создаем папку для изображений
    images_dir = os.path.join(os.path.dirname(__file__), 'product_images')
    os.makedirs(images_dir, exist_ok=True)
    
    # Получаем все товары без изображений
    products = Product.objects.filter(product_type='computer')
    
    print("=" * 80)
    print("GENERATING PRODUCT IMAGES")
    print("=" * 80)
    
    generated = 0
    skipped = 0
    
    for product in products:
        filepath = os.path.join(images_dir, f"{product.slug}.png")
        
        # Пропускаем если уже существует
        if os.path.exists(filepath):
            print(f"[SKIP] {product.slug} - already exists")
            skipped += 1
            continue
        
        print(f"[GENERATE] {product.name}...")
        try:
            if create_product_image(product, filepath):
                print(f"  [OK] Generated: {os.path.basename(filepath)}")
                generated += 1
        except Exception as e:
            print(f"  [ERROR] {e}")
    
    print("=" * 80)
    print(f"Generated: {generated}")
    print(f"Skipped: {skipped}")
    print("=" * 80)
    
    if generated > 0:
        print("\nImages generated successfully!")
        print("Now run: python upload_product_images.py")

if __name__ == '__main__':
    try:
        generate_product_images()
    except Exception as e:
        print(f"Error: {e}")
        print("Make sure Pillow is installed: pip install Pillow")
