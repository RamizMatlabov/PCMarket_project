#!/usr/bin/env python
"""
Скрипт для загрузки изображений товаров
Поместите изображения в папку backend/product_images/
Имена файлов должны соответствовать slug товаров
"""
import os
import sys
import django

# Add the project directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from django.core.files import File
from products.models import Product

def upload_product_images():
    """
    Загружает изображения для товаров из папки product_images/
    Имена файлов должны соответствовать slug товаров
    """
    # Путь к папке с изображениями
    images_dir = os.path.join(os.path.dirname(__file__), 'product_images')
    
    if not os.path.exists(images_dir):
        print(f"Sozdayu papku {images_dir}")
        os.makedirs(images_dir)
        print(f"Pomestite izobrazheniya v papku: {images_dir}")
        print("Imena faylov dolzhny sootvetstvovat slug tovarov:")
        print("  - gaming-pc-intel-i9-rtx4090.png")
        print("  - workstation-pc-amd-ryzen-9.png")
        print("  - apple-imac-24-m3.png")
        print("  - i t.d.")
        return
    
    # Получаем все товары без изображений или обновляем существующие
    products = Product.objects.filter(product_type='computer')
    
    uploaded = 0
    not_found = []
    
    for product in products:
        # Ищем изображение с разными расширениями
        image_extensions = ['.png', '.jpg', '.jpeg', '.webp']
        image_path = None
        
        for ext in image_extensions:
            potential_path = os.path.join(images_dir, f"{product.slug}{ext}")
            if os.path.exists(potential_path):
                image_path = potential_path
                break
        
        if image_path:
            try:
                with open(image_path, 'rb') as f:
                    # Удаляем старое изображение если есть
                    if product.image:
                        try:
                            os.remove(product.image.path)
                        except:
                            pass
                    
                    # Сохраняем новое изображение
                    product.image.save(
                        os.path.basename(image_path),
                        File(f),
                        save=True
                    )
                print(f"[OK] Zagruzheno izobrazhenie dlya: {product.name}")
                uploaded += 1
            except Exception as e:
                print(f"[ERROR] Oshibka pri zagruzke {product.name}: {e}")
        else:
            not_found.append(product.slug)
    
    print(f"\nZagruzheno izobrazheniy: {uploaded}")
    if not_found:
        print(f"\nNe naydeny izobrazheniya dlya sleduyushchih tovarov:")
        for slug in not_found:
            print(f"  - {slug}.png (ili .jpg, .jpeg, .webp)")
        print(f"\nPomestite izobrazheniya v papku: {images_dir}")

if __name__ == '__main__':
    upload_product_images()

