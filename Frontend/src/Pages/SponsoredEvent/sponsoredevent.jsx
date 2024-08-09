import React, { useEffect, useState } from "react";
import { useAuth } from "../../Store/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./sponsoredevent.css";

const SponsoredEvents = () => {
  const [events, setEvents] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchSponsoredEvents = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }
      try {
        const response = await fetch(
          "https://backend-f2bi.onrender.com/sponsors/get_sponsored_events/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setEvents(data.events);
        } else {
          const errorData = await response.json();
          console.error("Error fetching events:", errorData);
          toast.error(`Error: ${errorData.message || "Unknown error"}`);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        toast.error("Error fetching events");
      }
    };

    fetchSponsoredEvents();
  }, [user]);

  const formatTime = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(":");
    const date = new Date();
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
    date.setSeconds(parseInt(seconds, 10));

    return date.toLocaleTimeString();
  };

  const categoryMap = {
    1: "Arts",
    2: "Tech",
    3: "Music",
    4: "Cultural",
  };

  return (
    <div className="participating-events-container">
      <h1>Sponsored Events</h1>
      {events.length === 0 ? (
        <p>No sponsored events found.</p>
      ) : (
        <ul>
          {events.map((event) => (
            <li key={event.id}>
              <h2>{event.name}</h2>
              <p>Date: {new Date(event.event_date).toLocaleDateString()}</p>
              <p>Time: {formatTime(event.event_time)}</p>
              <p>Location: {event.venue}</p>
              <p>Price: {event.price}</p>
              <p>Description: {event.description}</p>
              <p>Category: {categoryMap[event.category_id]}</p>
            </li>
          ))}
        </ul>
      )}
      <ToastContainer />
    </div>
  );
};

export default SponsoredEvents;
