'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { isAuthenticated, getCurrentUser } from '@/utils/auth';
import { getCategories, updateProduct } from '@/utils/api';
import api from '@/utils/api';
import { Package, Upload, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function EditProductPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    product_type: '',
    brand: '',
    model: '',
    image: null,
    stock_quantity: '0',
    is_active: true,
  });

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }

    const user = getCurrentUser();
    setCurrentUser(user);

    const loadData = async () => {
      try {
        // Load categories
        const categoriesData = await getCategories();
        if (Array.isArray(categoriesData)) {
          setCategories(categoriesData);
        } else if (categoriesData && Array.isArray(categoriesData.results)) {
          setCategories(categoriesData.results);
        }

        // Load product
        const productResponse = await api.get(`/api/products/products/${slug}/`);
        const product = productResponse.data;

        // Check if user is the creator
        if (!product.created_by || user.id !== product.created_by.id) {
          setError('У вас нет прав для редактирования этого товара.');
          setLoadingProduct(false);
          return;
        }

        // Populate form with product data
        setFormData({
          name: product.name || '',
          description: product.description || '',
          price: product.price || '',
          category: product.category?.id || '',
          product_type: product.product_type || '',
          brand: product.brand || '',
          model: product.model || '',
          image: null, // Don't set existing image as file
          stock_quantity: product.stock_quantity?.toString() || '0',
          is_active: product.is_active !== undefined ? product.is_active : true,
        });

        // Set image preview if exists
        if (product.image_url) {
          setImagePreview(product.image_url);
        }
      } catch (error) {
        console.error('Error loading data:', error);
        setError('Не удалось загрузить данные товара.');
      } finally {
        setLoadingProduct(false);
        setLoadingCategories(false);
      }
    };

    loadData();
  }, [slug, router]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    try {
      // Validate required fields
      if (!formData.name || !formData.description || !formData.price || 
          !formData.category || !formData.product_type || !formData.brand || !formData.model) {
        setError('Пожалуйста, заполните все обязательные поля');
        setLoading(false);
        return;
      }

      // Validate price
      const price = parseFloat(formData.price);
      if (isNaN(price) || price <= 0) {
        setError('Цена должна быть положительным числом');
        setLoading(false);
        return;
      }

      const productData = {
        ...formData,
        price: price.toString(),
        stock_quantity: parseInt(formData.stock_quantity) || 0,
        is_active: formData.is_active,
      };

      await updateProduct(slug, productData);
      setSuccess(true);
      
      // Redirect to product page after 2 seconds
      setTimeout(() => {
        router.push(`/products/${slug}`);
      }, 2000);
    } catch (error) {
      console.error('Error updating product:', error);
      if (error.name || error.product_type || error.category) {
        const errorMessages = [];
        if (error.name) errorMessages.push(...(Array.isArray(error.name) ? error.name : [error.name]));
        if (error.product_type) errorMessages.push(...(Array.isArray(error.product_type) ? error.product_type : [error.product_type]));
        if (error.category) errorMessages.push(...(Array.isArray(error.category) ? error.category : [error.category]));
        setError(errorMessages.join(', '));
      } else if (error.detail) {
        setError(error.detail);
      } else {
        setError(error.message || 'Не удалось обновить товар. Пожалуйста, попробуйте снова.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loadingProduct || loadingCategories) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Загрузка...</div>
      </div>
    );
  }

  if (error && error.includes('нет прав')) {
    return (
      <div className="min-h-screen bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
          <div className="bg-slate-800 rounded-lg shadow-xl p-6 sm:p-8">
            <div className="flex items-center space-x-3 mb-6">
              <AlertCircle className="h-8 w-8 text-red-400" />
              <h1 className="text-2xl sm:text-3xl font-bold">Доступ запрещен</h1>
            </div>
            <p className="text-slate-300 mb-6">{error}</p>
            <Link
              href={`/products/${slug}`}
              className="inline-flex items-center text-blue-400 hover:text-blue-300"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Вернуться к товару
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        <div className="mb-4">
          <Link 
            href={`/products/${slug}`} 
            className="inline-flex items-center text-slate-300 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Назад к товару
          </Link>
        </div>

        <div className="bg-slate-800 rounded-lg shadow-xl p-6 sm:p-8">
          <div className="flex items-center space-x-3 mb-6">
            <Package className="h-8 w-8 text-blue-400" />
            <h1 className="text-2xl sm:text-3xl font-bold">Редактировать товар</h1>
          </div>

          {error && !error.includes('нет прав') && (
            <div className="mb-6 bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg flex items-start space-x-2">
              <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-medium">Ошибка</p>
                <p className="text-sm">{error}</p>
              </div>
            </div>
          )}

          {success && (
            <div className="mb-6 bg-green-500/10 border border-green-500 text-green-400 px-4 py-3 rounded-lg flex items-start space-x-2">
              <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-medium">Успешно!</p>
                <p className="text-sm">Товар успешно обновлен. Вы будете перенаправлены на страницу товара...</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="md:col-span-2">
                <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                  Название товара <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Например: Gaming PC AMD Ryzen 9 RTX 4090"
                />
              </div>

              {/* Brand */}
              <div>
                <label htmlFor="brand" className="block text-sm font-medium text-slate-300 mb-2">
                  Бренд <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Например: ASUS, Dell, Apple"
                />
              </div>

              {/* Model */}
              <div>
                <label htmlFor="model" className="block text-sm font-medium text-slate-300 mb-2">
                  Модель <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="model"
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Например: ROG Strix G18"
                />
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-slate-300 mb-2">
                  Категория <span className="text-red-400">*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  disabled={!Array.isArray(categories) || categories.length === 0}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">
                    {!Array.isArray(categories) || categories.length === 0
                      ? 'Категории не доступны'
                      : 'Выберите категорию'}
                  </option>
                  {Array.isArray(categories) && categories.length > 0 && categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Product Type */}
              <div>
                <label htmlFor="product_type" className="block text-sm font-medium text-slate-300 mb-2">
                  Тип товара <span className="text-red-400">*</span>
                </label>
                <select
                  id="product_type"
                  name="product_type"
                  value={formData.product_type}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Выберите тип</option>
                  <option value="computer">Компьютер</option>
                  <option value="all-in-one">Моноблок</option>
                  <option value="component">Комплектующее</option>
                  <option value="accessory">Аксессуар</option>
                  <option value="other">Другое</option>
                </select>
              </div>

              {/* Price */}
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-slate-300 mb-2">
                  Цена (USD) <span className="text-red-400">*</span>
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0.00"
                />
              </div>

              {/* Stock Quantity */}
              <div>
                <label htmlFor="stock_quantity" className="block text-sm font-medium text-slate-300 mb-2">
                  Количество на складе
                </label>
                <input
                  type="number"
                  id="stock_quantity"
                  name="stock_quantity"
                  value={formData.stock_quantity}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0"
                />
              </div>

              {/* Is Active */}
              <div className="md:col-span-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="is_active"
                    name="is_active"
                    checked={formData.is_active}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-slate-300">
                    Товар активен (отображается в каталоге)
                  </span>
                </label>
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-2">
                  Описание <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder="Подробное описание товара..."
                />
              </div>

              {/* Image Upload */}
              <div className="md:col-span-2">
                <label htmlFor="image" className="block text-sm font-medium text-slate-300 mb-2">
                  Изображение товара
                </label>
                <p className="text-xs text-slate-400 mb-2">
                  Оставьте пустым, чтобы сохранить текущее изображение
                </p>
                <div className="mt-2">
                  <label
                    htmlFor="image"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-600 border-dashed rounded-lg cursor-pointer bg-slate-700 hover:bg-slate-600 transition-colors"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-slate-400" />
                      <p className="mb-2 text-sm text-slate-400">
                        <span className="font-semibold">Нажмите для загрузки</span> или перетащите файл
                      </p>
                      <p className="text-xs text-slate-500">PNG, JPG, JPEG (MAX. 10MB)</p>
                    </div>
                    <input
                      id="image"
                      name="image"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
                {imagePreview && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-slate-300 mb-2">Предпросмотр:</p>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-w-xs h-32 object-cover rounded-lg border border-slate-600"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4 border-t border-slate-700">
              <button
                type="button"
                onClick={() => router.push(`/products/${slug}`)}
                className="px-6 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors"
              >
                Отмена
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Сохранение...</span>
                  </>
                ) : (
                  <>
                    <Package className="h-4 w-4" />
                    <span>Сохранить изменения</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

