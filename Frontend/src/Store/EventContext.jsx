import React, { createContext, useState, useContext, useEffect } from "react";

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [userEvents, setUserEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
    fetchUserEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/events/get_events/");
      const data = await response.json();
      setEvents(data.events);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const fetchUserEvents = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://127.0.0.1:8000/events/my_events/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setUserEvents(data.events);
    } catch (error) {
      console.error("Error fetching user events:", error);
    }
  };

  const editEvent = async (eventId, updatedEvent) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://127.0.0.1:8000/events/edit_event/${eventId}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedEvent),
        }
      );
      if (response.ok) {
        await fetchEvents();
        await fetchUserEvents();
      } else {
        console.error("Error editing event:", response.statusText);
      }
    } catch (error) {
      console.error("Error editing event:", error);
    }
  };


  const MakeEvents = async (data) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }
    try {
      const response = await fetch("http://127.0.0.1:8000/events/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        await fetchEvents();
        await fetchUserEvents();
      } else {
        const errorData = await response.json();
        console.error("Error creating event:", errorData);
        toast.error(
          `Error creating event: ${errorData.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error("Error creating event");
    }
  };

  const deleteEvent = async (eventId) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/events/delete_event/${eventId}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        await fetchEvents();
        await fetchUserEvents();
      } else {
        console.error("Error deleting event:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }

  };

  return (
    <EventContext.Provider
      value={{
        events,
        userEvents,
        fetchEvents,
        fetchUserEvents,
        editEvent,
        deleteEvent,
        MakeEvents,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => useContext(EventContext);
