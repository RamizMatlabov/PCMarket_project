'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, isAuthenticated, logout, getProfile } from '@/utils/auth';
import { updateProfile } from '@/utils/api';
import { User, LogOut, Mail, Calendar, Pencil } from 'lucide-react';


export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }

    const loadUser = async () => {
      try {
        const userData = await getProfile();
        setUser(userData);
      } catch (error) {
        console.error('Error loading profile:', error);
        const savedUser = getCurrentUser();
        if (savedUser) {
          setUser(savedUser);
          setFormData(savedUser);
        }
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [router]);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const updatedUser = await updateProfile(formData);
      setUser(updatedUser);
      setIsEditing(false);
    } catch (error) {
      setError(error.message || 'Не удалось обновить профиль');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !isEditing) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Загрузка...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Не указано';
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="py-8 sm:py-10 md:py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-slate-800 rounded-lg shadow-xl p-6 sm:p-7 md:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Профиль</h1>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <Pencil className="h-5 w-5" />
                <span>{isEditing ? 'Отмена' : 'Редактировать'}</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Выйти</span>
              </button>
            </div>
          </div>

          {error && <div className="bg-red-500 text-white p-4 rounded-md mb-6">{error}</div>}

          {isEditing ? (
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-slate-300 mb-2">Имя пользователя</label>
                  <input type="text" name="username" id="username" value={formData.username || ''} onChange={handleInputChange} className="w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                  <input type="email" name="email" id="email" value={formData.email || ''} onChange={handleInputChange} className="w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label htmlFor="first_name" className="block text-sm font-medium text-slate-300 mb-2">Имя</label>
                  <input type="text" name="first_name" id="first_name" value={formData.first_name || ''} onChange={handleInputChange} className="w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label htmlFor="last_name" className="block text-sm font-medium text-slate-300 mb-2">Фамилия</label>
                  <input type="text" name="last_name" id="last_name" value={formData.last_name || ''} onChange={handleInputChange} className="w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors">Отмена</button>
                <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50">{loading ? 'Сохранение...' : 'Сохранить'}</button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center space-x-4 pb-6 border-b border-slate-700">
                <div className="h-20 w-20 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="h-10 w-10 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {user.first_name || user.last_name
                      ? `${user.first_name || ''} ${user.last_name || ''}`.trim()
                      : user.username}
                  </h2>
                  <p className="text-slate-400">@{user.username}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                <div className="bg-slate-700/50 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <User className="h-5 w-5 text-blue-400" />
                    <h3 className="text-lg font-semibold text-white">Имя пользователя</h3>
                  </div>
                  <p className="text-slate-300">{user.username}</p>
                </div>

                <div className="bg-slate-700/50 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Mail className="h-5 w-5 text-blue-400" />
                    <h3 className="text-lg font-semibold text-white">Email</h3>
                  </div>
                  <p className="text-slate-300">{user.email || 'Не указан'}</p>
                </div>

                {user.first_name && (
                  <div className="bg-slate-700/50 rounded-lg p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <User className="h-5 w-5 text-blue-400" />
                      <h3 className="text-lg font-semibold text-white">Имя</h3>
                    </div>
                    <p className="text-slate-300">{user.first_name}</p>
                  </div>
                )}

                {user.last_name && (
                  <div className="bg-slate-700/50 rounded-lg p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <User className="h-5 w-5 text-blue-400" />
                      <h3 className="text-lg font-semibold text-white">Фамилия</h3>
                    </div>
                    <p className="text-slate-300">{user.last_name}</p>
                  </div>
                )}

                <div className="bg-slate-700/50 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Calendar className="h-5 w-5 text-blue-400" />
                    <h3 className="text-lg font-semibold text-white">Дата регистрации</h3>
                  </div>
                  <p className="text-slate-300">{formatDate(user.date_joined)}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}
