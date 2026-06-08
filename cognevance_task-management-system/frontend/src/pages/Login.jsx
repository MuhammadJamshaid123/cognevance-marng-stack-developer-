import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';

export default function Login() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await authAPI.login(form);
    if (res.success) {
      login({ _id: res.data._id, name: res.data.name, email: res.data.email }, res.data.token);
    } else {
      setError(res.message);
    }
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Task Manager</h1>
        <p className="subtitle">Sign in to manage your tasks</p>
        {error && <div className="alert alert-error">{error}</div>}
        <label>Email<input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></label>
        <label>Password<input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required /></label>
        <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Signing in...' : 'Sign In'}</button>
        <p className="auth-link">No account? <Link to="/register">Register</Link></p>
      </form>
    </div>
  );
}
