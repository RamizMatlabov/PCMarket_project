'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ShoppingCart, Edit, Trash2 } from 'lucide-react';
import api, { deleteProduct } from '@/utils/api';
import { useCart } from '@/context/CartContext';
import { getCurrentUser, isAuthenticated } from '@/utils/auth';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { addToCart, removeFromCart } = useCart();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (isAuthenticated()) {
      setCurrentUser(getCurrentUser());
    }
  }, []);

  useEffect(() => {
    if (!slug) return;
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get(`/products/products/${slug}/`);
        setProduct(response.data);
      } catch (e) {
        setError('Товар не найден или произошла ошибка загрузки.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
    }
  };

  const handleDelete = async () => {
    if (!showDeleteConfirm) {
      setShowDeleteConfirm(true);
      return;
    }

    try {
      setIsDeleting(true);
      await deleteProduct(slug);
      // Remove deleted product from cart if present
      if (product && product.id) {
        removeFromCart(product.id);
      }
      router.push('/products');
    } catch (error) {
      console.error('Error deleting product:', error);
      setError('Не удалось удалить товар. Попробуйте снова.');
      setShowDeleteConfirm(false);
    } finally {
      setIsDeleting(false);
    }
  };

  const isOwner = currentUser && product && product.created_by && 
                  currentUser.id === product.created_by.id;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="h-8 w-32 bg-slate-700 rounded mb-6 animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-800 rounded-lg h-64 md:h-96 animate-pulse"></div>
            <div className="space-y-3">
              <div className="h-6 w-3/4 bg-slate-700 rounded animate-pulse"></div>
              <div className="h-4 w-1/2 bg-slate-700 rounded animate-pulse"></div>
              <div className="h-8 w-40 bg-slate-700 rounded animate-pulse"></div>
              <div className="h-24 w-full bg-slate-800 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-slate-900 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center text-slate-300 hover:text-white mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Назад
          </button>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <p className="text-red-300">{error || 'Товар не найден'}</p>
            <Link href="/products" className="text-blue-400 hover:underline mt-3 inline-block">
              Вернуться к каталогу
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="mb-4">
          <Link href="/products" className="inline-flex items-center text-slate-300 hover:text-white">
            <ArrowLeft className="h-4 w-4 mr-2" />
            К каталогу
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          <div className="bg-slate-800 rounded-lg overflow-hidden flex items-center justify-center">
            {product.image_url ? (
              <Image
                src={product.image_url}
                alt={product.name}
                width={800}
                height={600}
                className="w-full h-auto object-contain max-h-[28rem]"
                priority
              />
            ) : (
              <div className="w-full h-80 bg-slate-700 flex items-center justify-center">
                <span className="text-slate-300">Нет изображения</span>
              </div>
            )}
          </div>

          <div>
            <div className="flex items-start justify-between mb-2">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">{product.name}</h1>
                <p className="text-slate-300 mt-2">{product.brand} {product.model}</p>
              </div>
              {isOwner && (
                <div className="flex gap-2 ml-4">
                  <Link
                    href={`/products/${slug}/edit`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors"
                    title="Редактировать товар"
                  >
                    <Edit className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      showDeleteConfirm
                        ? 'bg-red-600 hover:bg-red-700 text-white'
                        : 'bg-red-600/80 hover:bg-red-700 text-white'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                    title="Удалить товар"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            {showDeleteConfirm && (
              <div className="mb-4 bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg">
                <p className="font-medium mb-2">Вы уверены, что хотите удалить этот товар?</p>
                <div className="flex gap-2">
                  <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm disabled:opacity-50"
                  >
                    {isDeleting ? 'Удаление...' : 'Да, удалить'}
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    disabled={isDeleting}
                    className="px-3 py-1 bg-slate-600 hover:bg-slate-700 text-white rounded text-sm disabled:opacity-50"
                  >
                    Отмена
                  </button>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-extrabold text-blue-400">{product.price} USD</span>
              <span className={`text-sm px-2 py-1 rounded ${product.is_in_stock ? 'bg-green-700/40 text-green-300' : 'bg-slate-700 text-slate-300'}`}>
                {product.is_in_stock ? 'В наличии' : 'Нет в наличии'}
              </span>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={!product.is_in_stock}
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-lg font-semibold transition-colors ${
                product.is_in_stock
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-slate-600 text-slate-300 cursor-not-allowed'
              }`}
            >
              <ShoppingCart className="h-5 w-5" />
              Добавить в корзину
            </button>

            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-3">Описание</h2>
              <p className="text-slate-200 leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>

            {Array.isArray(product.specifications) && product.specifications.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-3">Характеристики</h2>
                <div className="bg-slate-800 rounded-lg divide-y divide-slate-700">
                  {product.specifications.map((spec, idx) => (
                    <div key={idx} className="flex items-start justify-between gap-4 px-4 py-3">
                      <span className="text-slate-300">{spec.name}</span>
                      <span className="text-white font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


