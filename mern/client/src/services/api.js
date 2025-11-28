import axios from 'axios';

const API = axios.create({
  baseURL: import.meta?.env?.VITE_API_BASE_URL || '/api',
});

export const fetchCart = async () => {
  const { data } = await API.get('/cart');
  return data.items;
};

export const addToCart = async (product) => {
  const { data } = await API.post('/cart', product);
  return data.item;
};

export const mutateCartItem = async (id, action) => {
  const { data } = await API.patch(`/cart/${id}`, { action });
  return data;
};

export const deleteCartItem = async (id) => {
  const { data } = await API.delete(`/cart/${id}`);
  return data;
};

