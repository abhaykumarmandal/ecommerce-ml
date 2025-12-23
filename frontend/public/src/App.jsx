// frontend/src/App.jsx
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Search, User, Package } from 'lucide-react';
import { ShopProvider, useShop } from './context/ShopContext';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Tracking from './pages/Tracking';
import Contact from './pages/Contact';
import './App.css';

const Navbar = () => {
  const { cart, wishlist } = useShop();
  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <nav className="navbar">
      <Link to="/" style={{textDecoration:'none', color: 'inherit'}}>
        <h1>SmartStore<span style={{color:'#3b82f6'}}>.AI</span></h1>
      </Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/tracking">Track Order</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <div className="nav-icons">
        <Link to="/cart" className="icon-btn">
          <ShoppingCart />
          {cartCount > 0 && <span className="badge">{cartCount}</span>}
        </Link>
        <div className="icon-btn">
          <Heart />
          {wishlist.length > 0 && <span className="badge">{wishlist.length}</span>}
        </div>
      </div>
    </nav>
  );
};

function App() {
  return (
    <ShopProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </ShopProvider>
  );
}

export default App;
