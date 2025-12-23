import { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Checkout = () => {
  const { cart, clearCart } = useShop();
  const navigate = useNavigate();
  const total = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  
  const [formData, setFormData] = useState({
    name: '', address: '', city: '', zip: '', card: '', expiry: '', cvv: ''
  });

  const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simulate API Call
    const orderData = {
      items: cart,
      total: total,
      address: formData
    };
    
    try {
      const res = await axios.post('http://127.0.0.1:5000/api/order', orderData);
      clearCart();
      // Navigate to tracking page with ID
      navigate(`/tracking?id=${res.data.tracking_id}`);
    } catch (err) {
      alert("Order Failed");
    }
  };

  return (
    <div className="container checkout-container">
      <div>
        <h2>Shipping & Payment</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input name="name" required onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input name="address" required onChange={handleChange} />
          </div>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem'}}>
            <div className="form-group">
               <label>City</label><input name="city" required onChange={handleChange} />
            </div>
            <div className="form-group">
               <label>Zip Code</label><input name="zip" required onChange={handleChange} />
            </div>
          </div>

          <h3 style={{marginTop:'2rem'}}>Card Details</h3>
          <div className="form-group">
            <label>Card Number</label>
            <input name="card" placeholder="0000 0000 0000 0000" required onChange={handleChange} />
          </div>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem'}}>
             <div className="form-group"><label>Expiry</label><input name="expiry" placeholder="MM/YY" required onChange={handleChange} /></div>
             <div className="form-group"><label>CVV</label><input name="cvv" required onChange={handleChange} /></div>
          </div>
          
          <button type="submit" className="btn btn-primary" style={{width:'100%', marginTop:'1rem'}}>Pay ${total.toFixed(2)}</button>
        </form>
      </div>

      <div className="order-summary">
        <h3>Order Summary</h3>
        {cart.map(item => (
            <div key={item.id} style={{display:'flex', justifyContent:'space-between', marginBottom:'0.5rem', fontSize:'0.9rem'}}>
                <span>{item.name} (x{item.qty})</span>
                <span>${(item.price * item.qty).toFixed(2)}</span>
            </div>
        ))}
        <hr />
        <div style={{display:'flex', justifyContent:'space-between', fontWeight:'bold'}}>
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};
export default Checkout;
