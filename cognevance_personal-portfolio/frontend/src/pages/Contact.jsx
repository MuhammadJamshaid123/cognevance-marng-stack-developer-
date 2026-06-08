import { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus({ type: 'success', message: 'Thank you! Your message has been sent.' });
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({ type: 'error', message: data.message || 'Something went wrong.' });
      }
    } catch {
      setStatus({ type: 'error', message: 'Unable to connect to server. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page-section">
      <div className="container narrow">
        <h2>Contact</h2>
        <p className="section-desc">Have a question or want to work together? Send me a message.</p>

        {status.message && (
          <div className={`alert alert-${status.type}`}>{status.message}</div>
        )}

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>
              Name
              <input name="name" value={form.name} onChange={handleChange} required />
            </label>
            <label>
              Email
              <input type="email" name="email" value={form.email} onChange={handleChange} required />
            </label>
          </div>
          <label>
            Subject
            <input name="subject" value={form.subject} onChange={handleChange} required />
          </label>
          <label>
            Message
            <textarea name="message" rows="5" value={form.message} onChange={handleChange} required />
          </label>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  );
}
