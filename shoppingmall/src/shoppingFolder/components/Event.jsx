import React, { useEffect, useState } from 'react';
import '../components/css/Events.css';

function Event() {
  const [eventsData, setEventsData] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/events');
        if (response.ok) {
          const data = await response.json();
          setEventsData(data);
        } else {
          console.error('Failed to fetch events');
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="events-list">
      <h1>Upcoming Mall Events</h1>
      {eventsData.map(event => (
        <div key={event._id} className="event-item">
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
