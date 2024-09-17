import React from 'react';
import '../components/css/Events.css';
import mallEvent from './images/shoplist/ambmall.jpg'; // Example event image

const eventsData = [
  {
    id: 1,
    name: 'Summer Carnival',
    date: 'July 20, 2024',
    time: '2:00 PM - 9:00 PM',
    description: 'Join us for a fun-filled day of games, food, and live entertainment.',
    image: mallEvent,
  },
  {
    id: 2,
    name: 'Holiday Music Fest',
    date: 'December 15, 2024',
    time: '4:00 PM - 8:00 PM',
    description: 'Enjoy live performances by local artists and festive activities.',
    image: mallEvent,
  },
  {
    id: 3,
    name: 'Food Truck Fiesta',
    date: 'October 10, 2024',
    time: '12:00 PM - 6:00 PM',
    description: 'Sample delicious street food from various food trucks around the city.',
    image: mallEvent,
  },
  {
    id: 4,
    name: 'Mall Fashion Show',
    date: 'September 30, 2024',
    time: '5:00 PM - 7:00 PM',
    description: 'Watch models showcase the latest fashion trends from stores around the mall.',
    image: mallEvent,
  },
];

function Event() {
  return (
    <div className="events-list">
      <h1>Upcoming Mall Events</h1>
      {eventsData.map(event => (
        <div key={event.id} className="event-item">
          <img src={event.image} alt={event.name} className="event-image" />
          <div className="event-info">
            <h2>{event.name}</h2>
            <p>{event.date}</p>
            <p>{event.time}</p>
            <p>{event.description}</p>
            <button>Learn More</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Event;
