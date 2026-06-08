const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5003/api';
const BASE_URL = API_URL.replace('/api', '');

const getHeaders = (isFormData = false) => {
  const token = localStorage.getItem('token');
  const headers = {};
  if (!isFormData) headers['Content-Type'] = 'application/json';
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
};

const request = async (url, options = {}) => {
  const res = await fetch(`${API_URL}${url}`, options);
  return res.json();
};

export const authAPI = {
  register: (data) => request('/auth/register', { method: 'POST', headers: getHeaders(), body: JSON.stringify(data) }),
  login: (data) => request('/auth/login', { method: 'POST', headers: getHeaders(), body: JSON.stringify(data) }),
  getMe: () => request('/auth/me', { headers: getHeaders() }),
};

export const productAPI = {
  getAll: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return request(`/products?${q}`, { headers: getHeaders() });
  },
  getOne: (id) => request(`/products/${id}`, { headers: getHeaders() }),
  create: (formData) => fetch(`${API_URL}/products`, { method: 'POST', headers: getHeaders(true), body: formData }).then((r) => r.json()),
  update: (id, formData) => fetch(`${API_URL}/products/${id}`, { method: 'PUT', headers: getHeaders(true), body: formData }).then((r) => r.json()),
  delete: (id) => request(`/products/${id}`, { method: 'DELETE', headers: getHeaders() }),
};

export const cartAPI = {
  get: () => request('/cart', { headers: getHeaders() }),
  add: (productId, quantity = 1) => request('/cart/add', { method: 'POST', headers: getHeaders(), body: JSON.stringify({ productId, quantity }) }),
  update: (productId, quantity) => request(`/cart/update/${productId}`, { method: 'PUT', headers: getHeaders(), body: JSON.stringify({ quantity }) }),
  remove: (productId) => request(`/cart/remove/${productId}`, { method: 'DELETE', headers: getHeaders() }),
  clear: () => request('/cart/clear', { method: 'DELETE', headers: getHeaders() }),
};

export const orderAPI = {
  create: (shippingAddress) => request('/orders/create', { method: 'POST', headers: getHeaders(), body: JSON.stringify({ shippingAddress }) }),
  myOrders: () => request('/orders/my', { headers: getHeaders() }),
  getAll: () => request('/orders', { headers: getHeaders() }),
  updateStatus: (id, status) => request(`/orders/${id}/status`, { method: 'PUT', headers: getHeaders(), body: JSON.stringify({ status }) }),
};

export const paymentAPI = {
  createIntent: (orderId) => request('/payment/create-intent', { method: 'POST', headers: getHeaders(), body: JSON.stringify({ orderId }) }),
  confirm: (orderId, paymentId) => request('/payment/confirm', { method: 'POST', headers: getHeaders(), body: JSON.stringify({ orderId, paymentId }) }),
};

export const analyticsAPI = {
  dashboard: () => request('/analytics/dashboard', { headers: getHeaders() }),
};

export { BASE_URL };
