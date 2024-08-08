import React from "react";
import { Link } from "react-router-dom";
import { useEvents } from "../../Store/EventContext";
import cultural from "../../assets/culture.jpeg";

import "./cultural.css";

const CulturalEvents = () => {
  const { events } = useEvents();

  const culturalEvents = events.filter((event) => event.category_id === 4);

  const formatTime = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(":");
    const date = new Date();
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
    date.setSeconds(parseInt(seconds, 10));

    return date.toLocaleTimeString();
  };

  return (
    <div className="category-page-container">
      <h1>Cultural Events</h1>
      {culturalEvents.length > 0 ? (
        <div className="event-cards">
          {culturalEvents.map((event) => (
            <div key={event.id} className="event-card">
              <Link to={`/events/${event.id}`} className="event-card-link">
                <img src={cultural} alt="Event" />
                <div className="event-card-body">
                  <h2 className="event-card-name">{event.name}</h2>
                  <p className="event-card-date-and-time">
                    Date: {new Date(event.event_date).toLocaleDateString()}
                    Time: {formatTime(event.event_time)}
                  </p>
                  <p className="event-card-location">Location: {event.venue}</p>
                  <p className="event-card-price">Price: {event.price}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div>No cultural events available.</div>
      )}
    </div>
  );
};

export default CulturalEvents;
