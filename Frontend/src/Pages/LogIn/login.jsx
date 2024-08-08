import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Store/AuthContext";
import styles from "./login.module.css";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink } from "react-router-dom";

function LogIn() {
  const { register, handleSubmit } = useForm("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmitData = async (data) => {
    try {
      await login(data.email, data.password);
      navigate(location?.state ? location.state : "/");
    } catch (error) {
      console.error("Login failed:", error.message);
      toast.error(error.message, {
        position: "top-right",
        autoClose: 4000,
      });
    }
  };
  return (
    <>
      <div
        className={`d-flex justify-content-center align-items-center py-4 bg-body-tertiary ${styles.customLogIn}`}
      >
        <main className={`form-signin w-100 m-auto ${styles.customMain}`}>
          <form
            className={`${styles.customForm}`}
            onSubmit={handleSubmit(onSubmitData)}
          >
            <ToastContainer />
            <h1 style={{ textAlign: "center" }} className="h3 mb-3 fw-normal">
              Please Login
            </h1>

            <div className={` form-floating ${styles.customEmail}`}>
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />

              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                {...register("password")}
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>

            <div className="form-check text-start my-3">
              <input
                className="form-check-input"
                type="checkbox"
                value="remember-me"
                id="flexCheckDefault"
                {...register("checkbox")}
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Remember me
              </label>
            </div>
            <button
              className={`btn btn-primary  py-2 ${styles.customButton}`}
              type="submit"
            >
              Login
            </button>
            <div style={{marginTop:"5px"}}>Don't have an account?  <NavLink to ="/signup">SignUp</NavLink></div>
            <p className="mt-5 mb-3 text-body-secondary">©2024</p>
          </form>
        </main>
      </div>
    </>
  );
}

export default LogIn;
