import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL, productAPI, cartAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function ProductDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [message, setMessage] = useState('');

  useEffect(() => {
    productAPI.getOne(id).then((res) => { if (res.success) setProduct(res.data); });
  }, [id]);

  const addToCart = async () => {
    if (!user) { setMessage('Please login to add to cart'); return; }
    const res = await cartAPI.add(id, qty);
    setMessage(res.success ? 'Added to cart!' : res.message);
    setTimeout(() => setMessage(''), 3000);
  };

  if (!product) return <p className="empty">Loading...</p>;

  return (
    <section className="page-section">
      <div className="container product-detail">
        <div className="detail-img">
          {product.image ? <img src={`${BASE_URL}${product.image}`} alt={product.name} /> : <div className="placeholder-img lg">{product.name[0]}</div>}
        </div>
        <div className="detail-info">
          <span className="category">{product.category}</span>
          <h1>{product.name}</h1>
          <p className="price lg">${product.price.toFixed(2)}</p>
          <p>{product.description}</p>
          <p className="stock">In stock: {product.stock}</p>
          {message && <div className="alert alert-success">{message}</div>}
          <div className="add-cart">
            <input type="number" min="1" max={product.stock} value={qty} onChange={(e) => setQty(Number(e.target.value))} />
            <button className="btn btn-primary" onClick={addToCart} disabled={product.stock === 0}>
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
