import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { BASE_URL, productAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const emptyForm = { name: '', description: '', price: '', category: '', stock: '', featured: false };

export default function AdminProducts() {
  const { isAdmin } = useAuth();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [image, setImage] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const fetchProducts = () => productAPI.getAll().then((res) => { if (res.success) setProducts(res.data); });
  useEffect(() => { fetchProducts(); }, []);

  if (!isAdmin) return <Navigate to="/login" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (image) fd.append('image', image);

    const res = editingId ? await productAPI.update(editingId, fd) : await productAPI.create(fd);
    if (res.success) {
      setForm(emptyForm);
      setImage(null);
      setEditingId(null);
      fetchProducts();
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this product?')) {
      await productAPI.delete(id);
      fetchProducts();
    }
  };

  return (
    <section className="page-section">
      <div className="container">
        <h1>Manage Products</h1>
        <div className="admin-layout">
          <form className="admin-form" onSubmit={handleSubmit}>
            <h2>{editingId ? 'Edit Product' : 'Add Product'}</h2>
            <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
            <input placeholder="Price" type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
            <input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
            <input placeholder="Stock" type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} required />
            <label><input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} /> Featured</label>
            <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
            <button type="submit" className="btn btn-primary">{editingId ? 'Update' : 'Create'}</button>
          </form>
          <div className="admin-table">
            {products.map((p) => (
              <div key={p._id} className="admin-row">
                {p.image && <img src={`${BASE_URL}${p.image}`} alt={p.name} className="thumb" />}
                <div><strong>{p.name}</strong><br />${p.price} | Stock: {p.stock}</div>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(p._id)}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
