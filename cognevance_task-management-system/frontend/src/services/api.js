const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5002/api';

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const authAPI = {
  register: (data) =>
    fetch(`${API_URL}/auth/register`, { method: 'POST', headers: getHeaders(), body: JSON.stringify(data) }).then((r) => r.json()),
  login: (data) =>
    fetch(`${API_URL}/auth/login`, { method: 'POST', headers: getHeaders(), body: JSON.stringify(data) }).then((r) => r.json()),
  getMe: () => fetch(`${API_URL}/auth/me`, { headers: getHeaders() }).then((r) => r.json()),
};

export const taskAPI = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetch(`${API_URL}/tasks?${query}`, { headers: getHeaders() }).then((r) => r.json());
  },
  create: (data) =>
    fetch(`${API_URL}/tasks`, { method: 'POST', headers: getHeaders(), body: JSON.stringify(data) }).then((r) => r.json()),
  update: (id, data) =>
    fetch(`${API_URL}/tasks/${id}`, { method: 'PUT', headers: getHeaders(), body: JSON.stringify(data) }).then((r) => r.json()),
  delete: (id) =>
    fetch(`${API_URL}/tasks/${id}`, { method: 'DELETE', headers: getHeaders() }).then((r) => r.json()),
};
