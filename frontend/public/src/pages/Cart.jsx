import { useShop } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart } = useShop();
  const total = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

  if (cart.length === 0) return <div className="container">Your cart is empty.</div>;

  return (
    <div className="container">
      <h2>Your Cart</h2>
      {cart.map(item => (
        <div key={item.id} style={{display:'flex', justifyContent:'space-between', padding:'1rem', borderBottom:'1px solid #eee'}}>
          <div style={{display:'flex', gap:'1rem'}}>
            <img src={item.image} width="80" />
            <div>
              <h3>{item.name}</h3>
              <p>${item.price} x {item.qty}</p>
            </div>
          </div>
          <button className="btn-danger btn" onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}
      <div style={{marginTop:'2rem', textAlign:'right'}}>
        <h3>Total: ${total.toFixed(2)}</h3>
        <Link to="/checkout"><button className="btn btn-primary">Proceed to Checkout</button></Link>
      </div>
    </div>
  );
};
export default Cart;
