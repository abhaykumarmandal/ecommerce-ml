
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useShop } from '../context/ShopContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [recommendations, setRecs] = useState([]);
  const { addToCart, toggleWishlist } = useShop();

  useEffect(() => {
    // Fetch Product
    axios.get(`http://127.0.0.1:5000/api/products/${id}`)
      .then(res => setProduct(res.data));
    
    // Fetch ML Recommendations
    axios.get(`http://127.0.0.1:5000/api/recommend/${id}`)
      .then(res => setRecs(res.data));
      
    window.scrollTo(0,0);
  }, [id]);

  if (!product) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem'}}>
        <img src={product.image} style={{width: '100%', borderRadius: '12px'}} />
        <div>
          <h1 style={{fontSize: '2.5rem'}}>{product.name}</h1>
          <h2 className="price" style={{fontSize: '2rem', margin: '1rem 0'}}>${product.price}</h2>
          <p style={{lineHeight: '1.6'}}>{product.description}</p>
          
          <div style={{display: 'flex', gap: '1rem', marginTop: '2rem'}}>
            <button className="btn btn-primary" onClick={() => addToCart(product)}>Add to Cart</button>
            <button className="btn" style={{border: '1px solid #ccc'}} onClick={() => toggleWishlist(product)}>
               ♥ Add to Wishlist
            </button>
          </div>
        </div>
      </div>

      {/* Recommendations Section */}
      <div style={{marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid #e2e8f0'}}>
        <h3>Recommended For You (ML Powered)</h3>
        <div className="grid">
          {recommendations.map(rec => (
            <Link to={`/product/${rec.id}`} key={rec.id} style={{textDecoration: 'none', color: 'inherit'}}>
              <div className="card">
                <img src={rec.image} alt={rec.name} />
                <div className="card-body">
                   <h4>{rec.name}</h4>
                   <p className="price">${rec.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ProductDetail;
