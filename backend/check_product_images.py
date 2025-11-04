#!/usr/bin/env python
"""
Скрипт для проверки товаров без изображений
"""
import os
import sys
import django

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from products.models import Product

def check_product_images():
    """Проверяет какие товары не имеют изображений"""
    # Проверяем компьютеры, моноблоки и ноутбуки
    products = Product.objects.filter(product_type='computer').order_by('category__name', 'name')
    
    print("=" * 80)
    print("TOVARY BEZ IZOBRAZHENIY")
    print("=" * 80)
    
    without_images = []
    with_images = []
    
    for product in products:
        if not product.image:
            without_images.append(product)
            print(f"[X] {product.category.name}: {product.name}")
            print(f"    Slug: {product.slug}")
            print(f"    Nuzhen file: {product.slug}.png (ili .jpg, .jpeg, .webp)")
            print()
        else:
            with_images.append(product)
    
    print("=" * 80)
    print(f"ITOGO:")
    print(f"  S izobrazheniyami: {len(with_images)}")
    print(f"  Bez izobrazheniy: {len(without_images)}")
    print("=" * 80)
    
    if without_images:
        print("\nDlya zagruzki izobrazheniy:")
        print("1. Pomestite fayly v papku: backend/product_images/")
        print("2. Zapustite: python upload_product_images.py")

if __name__ == '__main__':
    check_product_images()

