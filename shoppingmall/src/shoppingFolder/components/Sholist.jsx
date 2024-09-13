import React from 'react';
import '../components/css/Shoplist.css';
import ambmall from './images/shoplist/ambmall.jpg';

const shopsData = [
  {
    id: 1,
    name: 'AMBMall',
    location: 'Level 1, near JCPenney',
    image: ambmall, 
  },
  {
    id: 2,
    name: 'AMBMall',
    location: 'Level 2, near Macy\'s',
    contact: '(225) 888-4120',
    image: ambmall, 
  },
  {
    id: 1,
    name: 'AMBMall',
    location: 'Level 1, near JCPenney',
    image: ambmall, 
  },
  {
    id: 2,
    name: 'AMBMall',
    location: 'Level 2, near Macy\'s',
    contact: '(225) 888-4120',
    image: ambmall, 
  },
];

function ShopsList() {
  return (
    <div className="shops-list">
      <h1>Stores & Restaurants</h1>
      {shopsData.map(shop => (
        <div key={shop.id} className="shop-item">
          {/* Shop image */}
          <img src={shop.image} alt={shop.name} className="shop-image" />
          {/* Shop details */}
          <div className="shop-info">
            <h2>{shop.name}</h2>
            <p>{shop.location}</p>
            {shop.contact && <p>{shop.contact}</p>}
            <button>Details</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ShopsList;
