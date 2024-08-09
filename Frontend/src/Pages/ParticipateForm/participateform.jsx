import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./participateform.css";

const ParticipateForm = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }
    try {
      const response = await fetch(
        `https://backend-f2bi.onrender.com/participate/join/${eventId}/`,
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
        reset();
        toast.success("Successfully participated!");
      } else {
        const errorData = await response.json();
        console.error("Error participating:", errorData);
        toast.error(`Error: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error participating:", error);
      toast.error("Error participating");
    }
  };

  return (
    <div className="participate-form-container">
      <h2>Participate in Event</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input id="name" {...register("name", { required: true })} />
          {errors.name && (
            <span className="error-message">Name is required</span>
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
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ParticipateForm;
