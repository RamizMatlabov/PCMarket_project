import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  // Используем baseURL без /api, чтобы можно было добавлять полный путь
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Добавляем токен к каждому запросу, если он есть
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Если это FormData, не устанавливаем Content-Type, позволим axios установить его автоматически с boundary
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
    // Логируем URL для отладки
    const fullURL = config.baseURL && config.url 
      ? (config.baseURL.endsWith('/') ? config.baseURL.slice(0, -1) : config.baseURL) + 
        (config.url.startsWith('/') ? config.url : '/' + config.url)
      : config.url || config.baseURL;
    console.log('API Request:', config.method?.toUpperCase(), fullURL);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Обрабатываем ошибки авторизации и сетевые ошибки
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Обработка сетевых ошибок (сервер не доступен)
    if (!error.response) {
      console.error('Network error:', error.message);
      // Можно добавить уведомление пользователю о том, что сервер не доступен
      return Promise.reject(new Error('Сервер не доступен. Убедитесь, что бэкенд запущен на http://localhost:8000'));
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const response = await axios.post(`${API_BASE_URL}/api/accounts/token/refresh/`, {
            refresh: refreshToken,
          });
          const { access } = response.data;
          localStorage.setItem('accessToken', access);
          originalRequest.headers.Authorization = `Bearer ${access}`;
          return api(originalRequest);
        } catch (refreshError) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);

export const updateProfile = async (userData) => {
  try {
    const response = await api.put('/api/accounts/profile/', userData);
    const user = JSON.parse(localStorage.getItem('user'));
    const updatedUser = { ...user, ...response.data };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : new Error('Update failed');
  }
};

export const getCategories = async () => {
  try {
    const response = await api.get('/api/products/categories/');
    // Убеждаемся, что возвращаем массив
    const data = response.data;
    if (Array.isArray(data)) {
      return data;
    } else if (data && Array.isArray(data.results)) {
      return data.results;
    } else {
      console.error('Unexpected categories response format:', data);
      throw new Error('Неверный формат данных категорий');
    }
  } catch (error) {
    console.error('Error fetching categories:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const createProduct = async (productData) => {
  try {
    // Create FormData for file upload
    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('description', productData.description);
    formData.append('price', productData.price);
    formData.append('category', productData.category);
    formData.append('product_type', productData.product_type);
    formData.append('brand', productData.brand);
    formData.append('model', productData.model);
    formData.append('stock_quantity', productData.stock_quantity || 0);
    
    if (productData.image) {
      formData.append('image', productData.image);
    }
    
    const response = await api.post('/api/products/products/create/', formData);
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : new Error('Failed to create product');
  }
};

export const updateProduct = async (slug, productData) => {
  try {
    // Create FormData for file upload
    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('description', productData.description);
    formData.append('price', productData.price);
    formData.append('category', productData.category);
    formData.append('product_type', productData.product_type);
    formData.append('brand', productData.brand);
    formData.append('model', productData.model);
    formData.append('stock_quantity', productData.stock_quantity || 0);
    if (productData.is_active !== undefined) {
      formData.append('is_active', productData.is_active);
    }
    
    // Only append image if a new one is provided
    if (productData.image && productData.image instanceof File) {
      formData.append('image', productData.image);
    }
    
    const response = await api.patch(`/api/products/products/${slug}/update/`, formData);
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : new Error('Failed to update product');
  }
};

export const deleteProduct = async (slug) => {
  try {
    const response = await api.delete(`/api/products/products/${slug}/delete/`);
    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : new Error('Failed to delete product');
  }
};

export default api;
