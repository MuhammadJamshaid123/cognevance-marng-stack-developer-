import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL, productAPI } from '../services/api';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (search) params.search = search;
    if (category) params.category = category;
    productAPI.getAll(params).then((res) => {
      if (res.success) setProducts(res.data);
      setLoading(false);
    });
  }, [search, category]);

  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <section className="page-section">
      <div className="container">
        <h1>All Products</h1>
        <div className="filters">
          <input placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        {loading ? <p className="empty">Loading...</p> : (
          <div className="product-grid">
            {products.map((p) => (
              <Link key={p._id} to={`/products/${p._id}`} className="product-card">
                <div className="product-img">
                  {p.image ? <img src={`${BASE_URL}${p.image}`} alt={p.name} /> : <div className="placeholder-img">{p.name[0]}</div>}
                </div>
                <h3>{p.name}</h3>
                <p className="category">{p.category}</p>
                <p className="price">${p.price.toFixed(2)}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
