import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEvents } from "../../Store/EventContext";
import "./eventdetail.css";
import music from "../../assets/music.jpg";
import tech from "../../assets/tech.jpg";
import cultural from "../../assets/culture.jpeg";
import arts from "../../assets/arts.jpg";

const EventDetails = () => {
  const { eventId } = useParams();
  const { events } = useEvents();
  const navigate = useNavigate();

  const event = events.find((event) => event.id === Number(eventId));

  if (!event) {
    return <div>Event not found</div>;
  }

  const categoryImageMap = {
    1: arts,
    2: tech,
    3: music,
    4: cultural,
  };

  const formatTime = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(":");
    const date = new Date();
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
    date.setSeconds(parseInt(seconds, 10));

    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const eventImage = categoryImageMap[event.category_id];
 
 
  const validSponsors = (event.sponsor_names || []).filter(sponsor => sponsor !== null && sponsor !== undefined && sponsor !== '');
  function handleOnClick() {
    navigate(`/participate/${eventId}`);
  }

  function handleSponsorClick() {
    navigate(`/sponsor/${eventId}`);
  }
  return (
    <div className="event-details-container">
      <h1>{event.name}</h1>
      <img src={eventImage} alt={event.name} className="event-image" />
      <div className="event-details-content">
        <div className="event-info">
          <h2>Event Details</h2>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(event.event_date).toLocaleDateString()}
          </p>
          <p>
            <strong>Time:</strong> {formatTime(event.event_time)}
          </p>
          <p>
            <strong>Location:</strong> {event.venue}
          </p>
          <p>
            <strong>Price:</strong> {event.price}
          </p>
          <p>
            <strong>Description:</strong> {event.description}
          </p>
        </div>
        <div className="event-divider"></div>
        <div className="event-sponsors">
          <h2>Sponsors</h2>
          {validSponsors.length > 0 ? (
            <ul>
              {event.sponsor_names.map((sponsor, index) => (
                <li key={index}>{sponsor}</li>
              ))}
            </ul>
          ) : (
            <p>Not Sponsored Yet</p>
          )}
        </div>
      </div>
      <div className="event-actions">
        <button
          className="event-button participate-button"
          onClick={handleOnClick}
        >
          Participate
        </button>
        <button
          className="event-button sponsor-button"
          onClick={handleSponsorClick}
        >
          Sponsor
        </button>
      </div>
    </div>
  );
};

export default EventDetails;
