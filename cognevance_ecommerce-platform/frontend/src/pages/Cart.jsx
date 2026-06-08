import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL, cartAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Cart() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCart = () => {
    if (!user) { setLoading(false); return; }
    cartAPI.get().then((res) => {
      if (res.success) setCart(res.data);
      setLoading(false);
    });
  };

  useEffect(() => { fetchCart(); }, [user]);

  const updateQty = async (productId, quantity) => {
    await cartAPI.update(productId, quantity);
    fetchCart();
  };

  const removeItem = async (productId) => {
    await cartAPI.remove(productId);
    fetchCart();
  };

  if (!user) return (
    <section className="page-section"><div className="container"><p className="empty">Please <Link to="/login">login</Link> to view your cart.</p></div></section>
  );

  if (loading) return <p className="empty">Loading cart...</p>;

  const items = cart?.items || [];
  const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <section className="page-section">
      <div className="container">
        <h1>Shopping Cart</h1>
        {!items.length ? <p className="empty">Your cart is empty. <Link to="/products">Browse products</Link></p> : (
          <>
            <div className="cart-list">
              {items.map(({ product, quantity }) => (
                <div key={product._id} className="cart-item">
                  <div className="cart-item-img">
                    {product.image ? <img src={`${BASE_URL}${product.image}`} alt={product.name} /> : <div className="placeholder-img">{product.name[0]}</div>}
                  </div>
                  <div className="cart-item-info">
                    <h3>{product.name}</h3>
                    <p>${product.price.toFixed(2)}</p>
                  </div>
                  <div className="cart-item-qty">
                    <button onClick={() => updateQty(product._id, quantity - 1)}>-</button>
                    <span>{quantity}</span>
                    <button onClick={() => updateQty(product._id, quantity + 1)}>+</button>
                  </div>
                  <p className="cart-item-total">${(product.price * quantity).toFixed(2)}</p>
                  <button className="btn btn-sm btn-danger" onClick={() => removeItem(product._id)}>Remove</button>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <h2>Total: ${total.toFixed(2)}</h2>
              <button className="btn btn-primary btn-lg" onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
