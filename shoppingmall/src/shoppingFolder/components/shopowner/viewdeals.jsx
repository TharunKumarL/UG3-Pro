import React, { useState, useEffect } from 'react';
import '../css/viewdeals.css'; // Assuming you have a separate CSS file for styling

const ViewDeals = () => {
  const [deals, setDeals] = useState([]);

  // Fetch deals from the backend API
  useEffect(() => {
    const fetchDeals = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/shopowner/deals');
          if (!response.ok) {
            const errorText = await response.text(); // Get error response text
            console.error('Error fetching deals:', errorText);
            return; // Exit the function if there's an error
          }
          const data = await response.json();
          setDeals(data);
        } catch (error) {
          console.error('Error fetching deals:', error);
        }
      };
      

    fetchDeals();
  }, []);

  return (
    <div className="deals-container">
      <h1>Current Deals</h1>
      <div className="deals-grid">
        {deals.length === 0 ? (
          <p>No deals available at the moment.</p>
        ) : (
          deals.map((deal) => (
            <div className="deal-card" key={deal._id}>
              <img src={deal.image} alt={deal.store} className="deal-image" />
              <h2>{deal.store}</h2>
              <p>{deal.description}</p>
              <p className="deal-expiration">
                Expires on: {new Date(deal.expiration).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ViewDeals;
