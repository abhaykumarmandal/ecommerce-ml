import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className="card-link">
      <div className="card">
        <div className="card-image-container">
          <img src={product.image} alt={product.name} loading="lazy" />
        </div>
        <div className="card-body">
          <span className="category-tag">{product.category}</span>
          <h3>{product.name}</h3>
          <p className="price">${product.price.toFixed(2)}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
