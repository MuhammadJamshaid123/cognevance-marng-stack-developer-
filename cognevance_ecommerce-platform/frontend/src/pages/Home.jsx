import { Link } from 'react-router-dom';
import { BASE_URL, productAPI } from '../services/api';
import { useEffect, useState } from 'react';

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    productAPI.getAll({ featured: 'true' }).then((res) => {
      if (res.success) setFeatured(res.data.slice(0, 4));
    });
  }, []);

  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>Welcome to ShopHub</h1>
          <p>Discover amazing products at unbeatable prices</p>
          <Link to="/products" className="btn btn-primary btn-lg">Shop Now</Link>
        </div>
      </section>
      <section className="page-section">
        <div className="container">
          <h2>Featured Products</h2>
          <div className="product-grid">
            {featured.map((p) => (
              <Link key={p._id} to={`/products/${p._id}`} className="product-card">
                <div className="product-img">
                  {p.image ? <img src={`${BASE_URL}${p.image}`} alt={p.name} /> : <div className="placeholder-img">{p.name[0]}</div>}
                </div>
                <h3>{p.name}</h3>
                <p className="price">${p.price.toFixed(2)}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
