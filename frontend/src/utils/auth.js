import api from './api';

const triggerAuthChange = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('authChange'));
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post('/api/accounts/register/', userData);
    if (response.data.tokens) {
      localStorage.setItem('accessToken', response.data.tokens.access);
      localStorage.setItem('refreshToken', response.data.tokens.refresh);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      triggerAuthChange();
    }
    return response.data;
  } catch (error) {
    console.error('Register API error:', error);
    throw error;
  }
};

export const login = async (username, password) => {
  try {
    console.log('Attempting login with:', { username, password: '***' });
    // Используем полный путь /api/accounts/login/
    const response = await api.post('/api/accounts/login/', { username, password });
    console.log('Login response received');
    if (response.data.tokens) {
      localStorage.setItem('accessToken', response.data.tokens.access);
      localStorage.setItem('refreshToken', response.data.tokens.refresh);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      triggerAuthChange();
    }
    return response.data;
  } catch (error) {
    console.error('Login API error:', error);
    console.error('Error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      url: error.config?.url,
      baseURL: error.config?.baseURL,
      fullURL: error.config ? (error.config.baseURL || '') + (error.config.url || '') : 'unknown'
    });
    throw error;
  }
};

export const logout = async () => {
  try {
    await api.post('/api/accounts/logout/');
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    localStorage.removeItem('cart'); // Clear cart on logout
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
  const response = await api.get('/api/accounts/profile/');
  localStorage.setItem('user', JSON.stringify(response.data));
  return response.data;
};
