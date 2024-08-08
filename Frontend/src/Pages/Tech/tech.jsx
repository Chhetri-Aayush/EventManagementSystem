import React from "react";
import { Link } from "react-router-dom";
import { useEvents } from "../../Store/EventContext";
import tech from "../../assets/tech.jpg";
import "./tech.css";

const TechEvents = () => {
  const { events } = useEvents();

  const techEvents = events.filter((event) => event.category_id === 2);

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
      <h1>Tech Events</h1>
      {techEvents.length > 0 ? (
        <div className="event-cards">
          {techEvents.map((event) => (
            <Link
              key={event.id}
              to={`/events/${event.id}`}
              className="event-card"
            >
              <img src={tech} alt="Event" />
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
          ))}
        </div>
      ) : (
        <div>No tech events available.</div>
      )}
    </div>
  );
};

export default TechEvents;
