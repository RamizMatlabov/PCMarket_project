'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, isAuthenticated, logout, getProfile } from '@/utils/auth';
import { User, LogOut, Mail, Calendar } from 'lucide-react';
import Navigation from '@/components/Navigation';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
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
      <Navigation />
      <div className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-slate-800 rounded-lg shadow-xl p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-white">Профиль</h1>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Выйти</span>
            </button>
          </div>

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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        </div>
      </div>
      </div>
    </div>
  );
}
