#!/usr/bin/env python
"""
Скрипт для скачивания реальных изображений товаров из интернета
Использует прямые ссылки на изображения
"""
import os
import sys
import django
import requests
from urllib.parse import urlparse

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

# Прямые ссылки на изображения из различных источников
# Используем изображения с лицензией для коммерческого использования
IMAGE_URLS = {
    # Компьютеры
    'gaming-pc-intel-i9-rtx4090': [
        'https://images.pexels.com/photos/1714341/pexels-photo-1714341.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=800',
    ],
    'workstation-pc-amd-ryzen-9': [
        'https://images.pexels.com/photos/1714341/pexels-photo-1714341.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800',
    ],
    'gaming-pc-amd-ryzen-rtx4090': [
        'https://images.pexels.com/photos/1714341/pexels-photo-1714341.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800',
    ],
    # Моноблоки
    'apple-imac-24-m3': [
        'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800',
        'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800',
    ],
    'hp-pavilion-all-in-one-27': [
        'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800',
        'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800',
    ],
    'lenovo-ideacentre-aio-5-27': [
        'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800',
        'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800',
    ],
    # Ноутбуки
    'asus-rog-strix-g18': [
        'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800',
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800',
    ],
    'macbook-pro-16-m3-max': [
        'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800',
        'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800',
    ],
    'lenovo-thinkpad-x1-carbon-gen11': [
        'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800',
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800',
    ],
    'dell-xps-15': [
        'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800',
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800',
    ],
}

def download_image(url, filepath):
    """Скачивает изображение по URL"""
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
        response = requests.get(url, headers=headers, timeout=15, stream=True)
        response.raise_for_status()
        
        # Определяем расширение из URL или Content-Type
        parsed = urlparse(url)
        path = parsed.path.lower()
        
        if '.jpg' in path or '.jpeg' in path:
            ext = '.jpg'
        elif '.png' in path:
            ext = '.png'
        elif 'image/jpeg' in response.headers.get('content-type', ''):
            ext = '.jpg'
        elif 'image/png' in response.headers.get('content-type', ''):
            ext = '.png'
        else:
            ext = '.jpg'
        
        filepath_with_ext = filepath.rsplit('.', 1)[0] + ext
        
        with open(filepath_with_ext, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                if chunk:
                    f.write(chunk)
        
        # Проверяем что файл не пустой
        if os.path.getsize(filepath_with_ext) > 1000:
            return filepath_with_ext
        else:
            os.remove(filepath_with_ext)
            return None
    except Exception as e:
        print(f"  Error: {str(e)[:50]}")
        return None

def download_all_images():
    """Скачивает изображения для всех товаров"""
    images_dir = os.path.join(os.path.dirname(__file__), 'product_images')
    os.makedirs(images_dir, exist_ok=True)
    
    print("=" * 80)
    print("DOWNLOADING REAL PRODUCT IMAGES")
    print("=" * 80)
    
    downloaded = 0
    failed = []
    
    for slug, urls in IMAGE_URLS.items():
        filepath = os.path.join(images_dir, f"{slug}.jpg")
        
        # Пропускаем если уже существует реальное изображение
        if os.path.exists(filepath) and os.path.getsize(filepath) > 50000:
            print(f"[SKIP] {slug} - already has real image")
            continue
        
        print(f"[DOWNLOAD] {slug}...")
        success = False
        
        # Пробуем скачать с каждого URL
        for url in urls:
            result = download_image(url, filepath)
            if result:
                print(f"  [OK] Downloaded: {os.path.basename(result)}")
                downloaded += 1
                success = True
                break
        
        if not success:
            print(f"  [FAILED] Could not download")
            failed.append(slug)
    
    print("=" * 80)
    print(f"Downloaded: {downloaded}")
    if failed:
        print(f"Failed: {len(failed)}")
        print("(Will keep placeholder images)")
    
    if downloaded > 0:
        print("\nReal images downloaded!")
        print("Now run: python upload_product_images.py")
    else:
        print("\nNote: Some images could not be downloaded.")
        print("Placeholder images will be used instead.")

if __name__ == '__main__':
    try:
        import requests
        download_all_images()
    except ImportError:
        print("Installing requests...")
        os.system("pip install requests")
        import requests
        download_all_images()

