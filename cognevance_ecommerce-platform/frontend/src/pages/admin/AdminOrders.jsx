import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { orderAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export default function AdminOrders() {
  const { isAdmin } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    orderAPI.getAll().then((res) => { if (res.success) setOrders(res.data); });
  }, []);

  if (!isAdmin) return <Navigate to="/login" />;

  const updateStatus = async (id, status) => {
    await orderAPI.updateStatus(id, status);
    const res = await orderAPI.getAll();
    if (res.success) setOrders(res.data);
  };

  return (
    <section className="page-section">
      <div className="container">
        <h1>Manage Orders</h1>
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <span>#{order._id.slice(-6)} - {order.user?.name}</span>
                <select value={order.status} onChange={(e) => updateStatus(order._id, e.target.value)}>
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <p>{order.user?.email} | ${order.totalAmount.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
