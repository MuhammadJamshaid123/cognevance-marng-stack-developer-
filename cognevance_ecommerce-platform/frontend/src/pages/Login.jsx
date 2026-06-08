import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await authAPI.login(form);
    if (res.success) {
      login(res.data, res.data.token);
      navigate(res.data.role === 'admin' ? '/admin' : '/');
    } else {
      setError(res.message);
    }
  };

  return (
    <section className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Login</h1>
        {error && <div className="alert alert-error">{error}</div>}
        <label>Email<input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></label>
        <label>Password<input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required /></label>
        <button type="submit" className="btn btn-primary">Sign In</button>
        <p className="auth-link">No account? <Link to="/register">Register</Link></p>
      </form>
    </section>
  );
}
