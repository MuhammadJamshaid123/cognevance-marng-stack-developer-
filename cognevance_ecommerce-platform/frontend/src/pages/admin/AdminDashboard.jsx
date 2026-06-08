import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminDashboard() {
  const { isAdmin, loading } = useAuth();
  if (loading) return <p className="empty">Loading...</p>;
  if (!isAdmin) return <Navigate to="/login" />;

  return (
    <section className="page-section">
      <div className="container">
        <h1>Admin Dashboard</h1>
        <div className="admin-grid">
          <Link to="/admin/products" className="admin-card">
            <h2>Products</h2>
            <p>Manage product catalog and uploads</p>
          </Link>
          <Link to="/admin/orders" className="admin-card">
            <h2>Orders</h2>
            <p>View and update order status</p>
          </Link>
          <Link to="/admin/analytics" className="admin-card">
            <h2>Analytics</h2>
            <p>Sales, revenue, and top products</p>
          </Link>
        </div>
      </div>
    </section>
  );
}
