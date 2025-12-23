import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import { Sparkles } from 'lucide-react';

const Recommendations = ({ currentProductId }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentProductId) return;

    setLoading(true);
    // Fetch recommendations from Python/Flask ML backend
    axios.get(`http://127.0.0.1:5000/api/recommend/${currentProductId}`)
      .then(res => {
        setRecommendations(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching recommendations:", err);
        setLoading(false);
      });
  }, [currentProductId]);

  if (loading) return <div className="loading-spinner">Loading personalized picks...</div>;
  if (recommendations.length === 0) return null;

  return (
    <div className="recommendations-section">
      <div className="rec-header">
        <Sparkles className="rec-icon" />
        <h3>Recommended For You</h3>
      </div>
      <p className="rec-subtitle">AI-powered suggestions based on product similarity.</p>
      
      <div className="grid">
        {recommendations.map(rec => (
          <ProductCard key={rec.id} product={rec} />
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
