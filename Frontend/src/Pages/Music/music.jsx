import React from "react";
import { Link } from "react-router-dom"; // Import Link component
import { useEvents } from "../../Store/EventContext";
import music from "../../assets/music.jpg";
import "./music.css";

const MusicEvents = () => {
  const { events } = useEvents();

  const musicEvents = events.filter((event) => event.category_id === 3);

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
      <h1>Music Events</h1>
      {musicEvents.length > 0 ? (
        <div className="event-cards">
          {musicEvents.map((event) => (
            <div key={event.id} className="event-card">
              <Link to={`/events/${event.id}`} className="event-card-link">
                <img src={music} alt="Event" />
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
        <div>No music events available.</div>
      )}
    </div>
  );
};

export default MusicEvents;
