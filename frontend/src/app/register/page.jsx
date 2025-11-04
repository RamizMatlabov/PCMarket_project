'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { register, isAuthenticated } from '@/utils/auth';
import Navigation from '@/components/Navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    password2: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) {
      router.push('/profile');
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.password2) {
      setError('Пароли не совпадают');
      return;
    }

    setLoading(true);

    try {
      await register(formData);
      router.push('/profile');
    } catch (err) {
      const errorData = err.response?.data;
      if (typeof errorData === 'object' && errorData !== null) {
        const errorMessages = Object.values(errorData).flat().join(', ');
        setError(errorMessages);
      } else {
        setError('Ошибка при регистрации');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Navigation />
      <div className="flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-slate-800 rounded-lg shadow-xl p-8">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Регистрация</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-slate-300 mb-2">
              Имя пользователя *
            </label>
            <input
              id="username"
              type="text"
              required
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Введите имя пользователя"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Введите email"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="first_name" className="block text-sm font-medium text-slate-300 mb-2">
                Имя
              </label>
              <input
                id="first_name"
                type="text"
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Имя"
              />
            </div>

            <div>
              <label htmlFor="last_name" className="block text-sm font-medium text-slate-300 mb-2">
                Фамилия
              </label>
              <input
                id="last_name"
                type="text"
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Фамилия"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
              Пароль *
            </label>
            <input
              id="password"
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Введите пароль"
            />
          </div>

          <div>
            <label htmlFor="password2" className="block text-sm font-medium text-slate-300 mb-2">
              Подтвердите пароль *
            </label>
            <input
              id="password2"
              type="password"
              required
              value={formData.password2}
              onChange={(e) => setFormData({ ...formData, password2: e.target.value })}
              className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Подтвердите пароль"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Регистрация...' : 'Зарегистрироваться'}
          </button>
        </form>

        <p className="mt-6 text-center text-slate-400">
          Уже есть аккаунт?{' '}
          <Link href="/login" className="text-blue-400 hover:text-blue-300 font-medium">
            Войти
          </Link>
        </p>
      </div>
      </div>
    </div>
  );
}
