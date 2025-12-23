import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Shop = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/products')
      .then(res => setProducts(res.data));
  }, []);

  return (
    <div className="container">
      <h2>All Products</h2>
      <div className="grid">
        {products.map(p => (
          <Link to={`/product/${p.id}`} key={p.id} style={{textDecoration: 'none', color: 'inherit'}}>
            <div className="card">
              <img src={p.image} alt={p.name} />
              <div className="card-body">
                <p style={{fontSize:'0.8rem', color:'#64748b'}}>{p.category}</p>
                <h3>{p.name}</h3>
                <p className="price">${p.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Shop;
