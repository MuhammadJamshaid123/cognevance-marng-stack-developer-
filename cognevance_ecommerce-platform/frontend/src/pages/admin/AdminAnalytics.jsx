import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { analyticsAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export default function AdminAnalytics() {
  const { isAdmin } = useAuth();
  const [data, setData] = useState(null);

  useEffect(() => {
    analyticsAPI.dashboard().then((res) => { if (res.success) setData(res.data); });
  }, []);

  if (!isAdmin) return <Navigate to="/login" />;

  if (!data) return <p className="empty">Loading analytics...</p>;

  return (
    <section className="page-section">
      <div className="container">
        <h1>Analytics Dashboard</h1>
        <div className="stats-grid">
          <div className="stat-card"><h3>Total Revenue</h3><p>${data.totalRevenue.toFixed(2)}</p></div>
          <div className="stat-card"><h3>Total Orders</h3><p>{data.totalOrders}</p></div>
          <div className="stat-card"><h3>Products</h3><p>{data.totalProducts}</p></div>
          <div className="stat-card"><h3>Customers</h3><p>{data.totalUsers}</p></div>
        </div>

        <h2>Top Products</h2>
        <div className="admin-table">
          {data.topProducts.map((p) => (
            <div key={p._id} className="admin-row">
              <strong>{p._id}</strong>
              <span>Sold: {p.totalSold}</span>
              <span>Revenue: ${p.revenue.toFixed(2)}</span>
            </div>
          ))}
        </div>

        <h2>Sales by Month</h2>
        <div className="admin-table">
          {data.salesByMonth.map((m) => (
            <div key={m._id} className="admin-row">
              <strong>{m._id}</strong>
              <span>{m.count} orders</span>
              <span>${m.revenue.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
