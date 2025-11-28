import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { addToCart, fetchCart, mutateCartItem } from '../services/api';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await fetchCart();
        setItems(data);
      } catch (err) {
        setError(err.message || 'Unable to load cart.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleAdd = async (product) => {
    try {
      const updated = await addToCart(product);
      setItems((prev) => {
        const next = prev.filter((item) => item._id !== updated._id);
        return [...next, updated];
      });
    } catch (err) {
      setError(err.message || 'Could not add to cart.');
    }
  };

  const handleQuantity = async (id, action) => {
    try {
      const { item, removed } = await mutateCartItem(id, action);
      setItems((prev) => {
        if (removed || !item) {
          return prev.filter((p) => p._id !== id);
        }
        return prev.map((p) => (p._id === id ? item : p));
      });
    } catch (err) {
      setError(err.message || 'Unable to update quantity.');
    }
  };

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const value = {
    items,
    loading,
    error,
    total,
    addItem: handleAdd,
    increment: (id) => handleQuantity(id, 'increment'),
    decrement: (id) => handleQuantity(id, 'decrement'),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used inside CartProvider');
  }
  return ctx;
}

