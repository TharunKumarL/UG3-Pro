import React, { useEffect, useState } from 'react';

const DealsList = () => {
  const [deals, setDeals] = useState([]);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/deals');
        if (!response.ok) {
          throw new Error('Failed to fetch deals');
        }
        const data = await response.json();
        setDeals(data);
      } catch (error) {
        console.error('Error:', error);
        setError(error.message);
      }
    };

    fetchDeals();
  }, []);

  const handleUpdate = (dealId) => {
    // Logic to handle deal update, e.g., show a form or modal
    console.log('Update deal with ID:', dealId);
    // Implement your update logic here
  };

  return (
    <div>
      <h1>All Deals</h1>
      {error && <p className="error">{error}</p>}
      <ul>
        {deals.map((deal) => (
          <li key={deal._id}>
            <h2>{deal.name}</h2>
            <p><strong>Description:</strong> {deal.description}</p>
            <p><strong>Expiration:</strong> {deal.expiration}</p>
            <button onClick={() => handleUpdate(deal._id)}>Update Deal</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DealsList;
