import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { cartAPI } from '../services/api';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    if (!user) { setCart(null); return; }
    setLoading(true);
    const res = await cartAPI.get();
    if (res.success) setCart(res.data);
    setLoading(false);
  }, [user]);

  useEffect(() => { fetchCart(); }, [fetchCart]);

  const itemCount = cart?.items?.reduce((sum, i) => sum + i.quantity, 0) || 0;

  return (
    <CartContext.Provider value={{ cart, setCart, fetchCart, loading, itemCount }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
