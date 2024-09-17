import React from 'react';
import '../components/css/Deals.css'; // Update to the correct CSS file for deals
import ambmall from './images/shoplist/ambmall.jpg'; // Use a relevant image or deal banner

const dealsData = [
  {
    id: 1,
    store: 'AMBMall',
    description: '50% off on all items',
    expiration: 'Valid until Sept 30, 2024',
    image: ambmall,
  },
  {
    id: 2,
    store: 'FashionHub',
    description: 'Buy 1 Get 1 Free on selected clothing',
    expiration: 'Valid until Oct 15, 2024',
    image: ambmall,
  },
  {
    id: 3,
    store: 'TechWorld',
    description: '20% off on electronics above $500',
    expiration: 'Valid until Sept 25, 2024',
    image: ambmall,
  },
  {
    id: 4,
    store: 'Gourmet Foods',
    description: 'Free dessert with every meal',
    expiration: 'Valid on weekends',
    image: ambmall,
  },
];

function Deals() {
  return (
    <div className="deals-list">
      <h1>Exclusive Deals & Offers</h1>
      {dealsData.map(deal => (
        <div key={deal.id} className="deal-item">
          {/* Deal image */}
          <img src={deal.image} alt={deal.store} className="deal-image" />
          {/* Deal details */}
          <div className="deal-info">
            <h2>{deal.store}</h2>
            <p>{deal.description}</p>
            {deal.expiration && <p className="expiration">{deal.expiration}</p>}
            <button>View Deal</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Deals;
