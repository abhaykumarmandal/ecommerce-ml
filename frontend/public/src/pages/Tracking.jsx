import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const Tracking = () => {
  const [searchParams] = useSearchParams();
  const [trackingId, setTrackingId] = useState(searchParams.get('id') || '');
  const [status, setStatus] = useState(null);
  const [error, setError] = useState('');

  const track = () => {
    axios.get(`http://127.0.0.1:5000/api/track/${trackingId}`)
      .then(res => { setStatus(res.data); setError(''); })
      .catch(err => { setError('Order not found'); setStatus(null); });
  };

  useEffect(() => {
    if (trackingId) track();
  }, []);

  return (
    <div className="container">
      <div className="tracking-box">
        <h2>Track Your Order</h2>
        <div style={{display:'flex', gap:'0.5rem', justifyContent:'center', margin:'1rem 0'}}>
            <input 
              value={trackingId} 
              onChange={(e) => setTrackingId(e.target.value)} 
              placeholder="Enter Tracking ID (e.g. TRK-1234...)" 
              style={{padding:'0.5rem', width:'250px'}}
            />
            <button className="btn btn-primary" onClick={track}>Track</button>
        </div>

        {error && <p style={{color:'red'}}>{error}</p>}

        {status && (
          <div style={{marginTop:'2rem', textAlign:'left'}}>
            <h3>Status: <span style={{color:'#3b82f6'}}>{status.status}</span></h3>
            <p>Order Total: ${status.total}</p>
            <div className="status-step active">
               Order Placed
            </div>
            <div className={`status-step ${status.status !== 'Processing' ? 'active' : ''}`}>
               Processing
            </div>
            <div className={`status-step ${status.status === 'Delivered' ? 'active' : ''}`}>
               Delivered
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Tracking;
