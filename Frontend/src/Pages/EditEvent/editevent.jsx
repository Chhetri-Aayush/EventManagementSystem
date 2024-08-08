import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEvents } from "../../Store/EventContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./editevent.css";


const EditEvent = () => {
  const { eventId } = useParams();
  const { events, editEvent } = useEvents();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    const eventToEdit = events.find((e) => e.id === parseInt(eventId));
    if (eventToEdit) {
      reset({
        name: eventToEdit.name,
        description: eventToEdit.description,
        event_date: eventToEdit.event_date.split("T")[0],
        event_time: eventToEdit.event_time.split("T")[1],
        venue: eventToEdit.venue,
        category_id: eventToEdit.category_id,
        price: eventToEdit.price,
      });
    }
  }, [eventId, events, reset]);

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      await editEvent(eventId, data);
      alert("Event Updated Successfully");
      navigate("/");
      
      
    } catch (error) {
      console.error("Error updating event:", error);
      toast.error("Error updating event");
    }
  };

  return (
    <div className="create-event-container">
      <h1>Edit Event</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="create-event-form">
        <div className="form-group">
          <label htmlFor="eventName">Event Name</label>
          <input id="eventName" {...register("name", { required: true })} />
          {errors.name && (
            <span className="error-message">Event Name is required</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="eventDate">Event Date</label>
          <input
            id="eventDate"
            type="date"
            {...register("event_date", { required: true })}
          />
          {errors.event_date && (
            <span className="error-message">Event Date is required</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="eventTime">Event Time</label>
          <input
            id="eventTime"
            type="time"
            {...register("event_time", { required: true })}
          />
          {errors.event_time && (
            <span className="error-message">Event Time is required</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="eventLocation">Event Location</label>
          <input
            id="eventLocation"
            {...register("venue", { required: true })}
          />
          {errors.venue && (
            <span className="error-message">Event Location is required</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="eventDescription">Event Description</label>
          <textarea
            id="eventDescription"
            {...register("description", { required: true })}
          ></textarea>
          {errors.description && (
            <span className="error-message">Event Description is required</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            {...register("category_id", { required: true })}
          >
            <option value="">Select Category</option>
            <option value="1">Arts</option>
            <option value="2">Tech</option>
            <option value="3">Music</option>
            <option value="4">Cultural</option>
          </select>
          {errors.category_id && (
            <span className="error-message">Category is required</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input id="price" {...register("price", { required: true })} />
          {errors.price && (
            <span className="error-message">Price is required</span>
          )}
        </div>
        <button type="submit" className="submit-button">
          Save Changes
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EditEvent;
