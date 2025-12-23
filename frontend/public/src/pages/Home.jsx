import { Link } from 'react-router-dom';

const Home = () => (
  <div className="container" style={{textAlign: 'center', padding: '4rem 0'}}>
    <h1 style={{fontSize: '3rem', marginBottom: '1rem'}}>Intelligent Shopping Evolved</h1>
    <p style={{fontSize: '1.2rem', color: '#64748b', marginBottom: '2rem'}}>
      Experience personalized shopping powered by Machine Learning.
    </p>
    <Link to="/shop">
      <button className="btn btn-primary" style={{padding: '1rem 2rem', fontSize: '1.1rem'}}>
        Browse Collection
      </button>
    </Link>
  </div>
);
export default Home;
