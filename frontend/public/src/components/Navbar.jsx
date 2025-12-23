import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const Navbar = () => {
  const { cart, wishlist } = useShop();
  
  // Calculate total items in cart
  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <nav className="navbar">
      <Link to="/" className="logo-link">
        <h1>SmartStore<span className="highlight">.AI</span></h1>
      </Link>
      
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/tracking">Track Order</Link>
        <Link to="/contact">Contact</Link>
      </div>

      <div className="nav-icons">
        <Link to="/cart" className="icon-btn" aria-label="Cart">
          <ShoppingCart size={24} />
          {cartCount > 0 && <span className="badge">{cartCount}</span>}
        </Link>
        
        <div className="icon-btn" aria-label="Wishlist">
          <Heart size={24} />
          {wishlist.length > 0 && <span className="badge">{wishlist.length}</span>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
