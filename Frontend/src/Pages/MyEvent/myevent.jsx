import React, { useEffect } from "react";
import { useEvents } from "../../Store/EventContext";
import { useAuth } from "../../Store/AuthContext";
import { useNavigate } from "react-router-dom";
import "./myevents.css";
import music from "../../assets/music.jpg";
import tech from "../../assets/tech.jpg";
import cultural from "../../assets/culture.jpeg";
import arts from "../../assets/arts.jpg";

const MyEvents = () => {
  const { userEvents, fetchUserEvents, deleteEvent } = useEvents();
  const { user } = useAuth();
  const navigate = useNavigate();

 

  const handleEdit = (eventId) => {
    navigate(`/editEvent/${eventId}`);
  };

  const handleDelete = async (eventId) => {
    await deleteEvent(eventId);
  };
 console.log(userEvents);
  if (userEvents.length === 0) {
    return (
      <div className="my-events-container">
        <h1>My Events</h1>
        <p>You have not created any events.</p>
      </div>
    );
  }

  const formatTime = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(":");
    const date = new Date();
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
    date.setSeconds(parseInt(seconds, 10));

    return date.toLocaleTimeString();
  };

  const categoryImageMap = {
    1: arts,
    2: tech,
    3: music,
    4: cultural,
  };

  console.log(userEvents);
  return (
    <div className="my-events-container">
      <h1>My Events</h1>
      <div className="event-cards">
        {userEvents.map((event) => {
          const eventImage = categoryImageMap[event.category_id];
          return (
            <div key={event.id} className="event-card">
              <img src={eventImage} alt={event.name} />
              <div className="event-card-body">
                <h2 className="event-card-name">{event.name}</h2>
                <p className="event-card-description">{event.description}</p>
                <p className="event-card-date-and-time">
                  Date: {new Date(event.event_date).toLocaleDateString()} 
                  Time: {formatTime(event.event_time)}
                </p>
                <p className="event-card-venue">Location: {event.venue}</p>
                <button
                  className="event-card-button"
                  onClick={() => handleEdit(event.id)}
                >
                  Edit
                </button>
                <button
                  className="event-card-button"
                  onClick={() => handleDelete(event.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyEvents;
