import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import "./sponsorform.css";
import { useEvents } from "../../Store/EventContext";


const SponsorForm = () => {
  const { eventId } = useParams();
  const {fetchEvents,fetchuserEvents}=useEvents();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/sponsors/${eventId}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        
        await fetchEvents();
        await fetchuserEvents();
        toast.success("Event Sponsored Successfull!");
        navigate("/");
      } else {
        const errorData = await response.json();
        console.error("Error sponsoring:", errorData);
        toast.error(`Error: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error sponsoring:", error);
      toast.error("Error sponsoring");
    }
  };

  return (
    <div className="sponsor-form-container">
      <h2>Sponsor the Event</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="name">Sponsor Name</label>
          <input id="name" {...register("name", { required: true })} />
          {errors.name && (
            <span className="error-message">Sponsor Name is required</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="contact_number">Contact Number</label>
          <input
            id="contact_number"
            type="tel"
            {...register("contact_number", { required: true })}
          />
          {errors.contact_number && (
            <span className="error-message">Contact number is required</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            // type="number"
            {...register("amount", { required: true })}
          />
          {errors.amount && (
            <span className="error-message">Amount is required</span>
          )}
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SponsorForm;
