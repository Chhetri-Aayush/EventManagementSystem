import { NavLink, useNavigate } from "react-router-dom";
import styles from "./signup.module.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmitData = async (data) => {
    try {
      const response = await fetch(
        "https://backend-f2bi.onrender.com/authentication/register/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();

      if (response.ok) {
        toast.success("Verification mail sent!");
      } else {
        toast.error(result.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    }
  };
  return (
    <>
      <ToastContainer />
      <div className={`${styles.fullscreen}`}>
        <div className={`${styles.customDialog}`} role="document">
          <div className={`${styles.customContent} rounded-4 shadow`}>
            <div className="modal-header p-5 pb-4 border-bottom-0">
              <h1 className={`fw-bold mb-0 fs-2 ${styles.customSignUp}`}>
                Sign up
              </h1>
            </div>

            <div className="modal-body p-5 pt-0">
              <form onSubmit={handleSubmit(onSubmitData)}>
                <div className="form-floating mb-3">
                  <input
                    type="name"
                    className="form-control rounded-3"
                    id="floatingInput"
                    placeholder="name@example.com"
                    {...register("username")}
                  />
                  <label htmlFor="floatingInput">Username</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control rounded-3"
                    id="floatingInput"
                    placeholder="name@example.com"
                    {...register("email")}
                  />
                  <label htmlFor="floatingInput">Email address</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="Password"
                    className="form-control rounded-3"
                    id="floatingPassword"
                    placeholder="Password"
                    {...register("password")}
                  />
                  <label htmlFor="floatingInput">Password</label>
                </div>

                <div>
                  <small
                    className={`text-body-secondary  p-5 ${styles.customQuestion}`}
                  >
                    Already a member? <NavLink to="/login">Log In</NavLink>
                  </small>
                </div>

                <button
                  className={`mb-2 btn btn-lg rounded-3 btn-primary ${styles.customButton}`}
                  type="submit"
                >
                  Sign up
                </button>

                <br />

                <small className="text-body-secondary">
                  By clicking Sign up, you agree to the terms of use.
                </small>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
