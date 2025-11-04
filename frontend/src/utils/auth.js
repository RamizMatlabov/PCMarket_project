import api from './api';

const triggerAuthChange = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('authChange'));
  }
};

export const register = async (userData) => {
  const response = await api.post('/accounts/register/', userData);
  if (response.data.tokens) {
    localStorage.setItem('accessToken', response.data.tokens.access);
    localStorage.setItem('refreshToken', response.data.tokens.refresh);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    triggerAuthChange();
  }
  return response.data;
};

export const login = async (username, password) => {
  const response = await api.post('/accounts/login/', { username, password });
  if (response.data.tokens) {
    localStorage.setItem('accessToken', response.data.tokens.access);
    localStorage.setItem('refreshToken', response.data.tokens.refresh);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    triggerAuthChange();
  }
  return response.data;
};

export const logout = async () => {
  try {
    await api.post('/accounts/logout/');
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    triggerAuthChange();
  }
};

export const getCurrentUser = () => {
  if (typeof window === 'undefined') return null;
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('accessToken');
};

export const getProfile = async () => {
  const response = await api.get('/accounts/profile/');
  localStorage.setItem('user', JSON.stringify(response.data));
  return response.data;
};
