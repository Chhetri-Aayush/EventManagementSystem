import styles from "./footer.module.css";
import image7 from "../../assets/logo.jpg";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <>
      <div className={`${styles.footerDiv}`}>
        <footer className="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5  w-100">
          <div className="col mb-3">
            <NavLink
              to="/"
              className="d-flex align-items-center text-decoration-none"
            >
              <img src={image7} alt="" className={`${styles.customImage}`} />
            </NavLink>
            <p
              className="text-body-secondary"
              style={{
                fontSize: "20px",
                position: "absolute",
                left: "150px",
                top: "190px",
              }}
            >
              © 2024
            </p>
          </div>
          <div className="col mb-3 d-flex align-items-center justify-content-center">
            <p className={`${styles.footerText} text-center`}>
              We help you create events with ease
            </p>
          </div>

          <div className="col mb-3">
            <h5>Use EventEase</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <NavLink
                  to="/createEvent"
                  className="nav-link p-0 text-body-secondary"
                >
                  Create Event
                </NavLink>
              </li>
              <li className="nav-item mb-2">
                <NavLink to="" className="nav-link p-0 text-body-secondary">
                  Sponsor Event
                </NavLink>
              </li>
              <li className="nav-item mb-2">
                <NavLink to="" className="nav-link p-0 text-body-secondary">
                  Find Event
                </NavLink>
              </li>
              <li className="nav-item mb-2">
                <NavLink to="" className="nav-link p-0 text-body-secondary">
                  FAQs
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="col mb-3">
            <h5>Help</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <NavLink
                  to="/signup"
                  className="nav-link p-0 text-body-secondary"
                >
                  SignUp
                </NavLink>
              </li>
              <li className="nav-item mb-2">
                <NavLink
                  to="/login"
                  className="nav-link p-0 text-body-secondary"
                >
                  LogIn
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="col mb-3">
            <h5>Connect With Us</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-body-secondary">
                  Facebook
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-body-secondary">
                  Instagram
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-body-secondary">
                  Twitter
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-body-secondary">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Footer;
