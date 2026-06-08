import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { orderAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) orderAPI.myOrders().then((res) => { if (res.success) setOrders(res.data); });
  }, [user]);

  if (!user) return (
    <section className="page-section"><div className="container"><p className="empty">Please <Link to="/login">login</Link> to view orders.</p></div></section>
  );

  return (
    <section className="page-section">
      <div className="container">
        <h1>My Orders</h1>
        {!orders.length ? <p className="empty">No orders yet.</p> : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order._id} className="order-card">
                <div className="order-header">
                  <span>Order #{order._id.slice(-6)}</span>
                  <span className={`badge status-${order.status}`}>{order.status}</span>
                </div>
                <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                <ul>
                  {order.items.map((item, i) => (
                    <li key={i}>{item.name} x{item.quantity} - ${(item.price * item.quantity).toFixed(2)}</li>
                  ))}
                </ul>
                <p className="order-total">Total: ${order.totalAmount.toFixed(2)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
