import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5282/api', // Ou o link do Render
});

// Isso aqui é mágica: Toda requisição vai levar o token se ele existir
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('financeiro_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;