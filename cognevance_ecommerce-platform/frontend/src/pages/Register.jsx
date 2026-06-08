import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await authAPI.register(form);
    if (res.success) {
      login(res.data, res.data.token);
      navigate('/');
    } else {
      setError(res.message);
    }
  };

  return (
    <section className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Register</h1>
        {error && <div className="alert alert-error">{error}</div>}
        <label>Name<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></label>
        <label>Email<input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></label>
        <label>Password<input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required minLength={6} /></label>
        <button type="submit" className="btn btn-primary">Create Account</button>
        <p className="auth-link">Have an account? <Link to="/login">Login</Link></p>
      </form>
    </section>
  );
}
