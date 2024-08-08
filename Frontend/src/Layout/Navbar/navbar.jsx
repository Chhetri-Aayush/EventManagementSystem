import { useAuth } from "../../Store/AuthContext";
import styles from "./navbar.module.css";
import { NavLink, useNavigate } from "react-router-dom";

function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleOnLogOut() {
    logout();
    navigate("/");
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <NavLink className={styles.logo} to="/">
          EventEase
        </NavLink>
        <div className={styles.menu}>
          <form className={styles.searchForm} role="search">
            <input
              className={styles.searchInput}
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className={styles.searchButton} type="submit">
              Search
            </button>
          </form>
          <ul className={styles.navLinks}>
            <li className={styles.navItem}>
              <NavLink className={styles.navLink} to="/createEvent">
                Create Event
              </NavLink>
            </li>

            <li className={styles.navItem}>
              <NavLink className={styles.navLink} to="/participatingEvent">
                Participating Event
              </NavLink>
            </li>

            <li className={styles.navItem}>
              <NavLink className={styles.navLink} to="/sponsoredEvent">
                Sponsored Event
              </NavLink>
            </li>

            {user ? (
              <li className={styles.navItem}>
                <NavLink className={styles.navLink} to="/myevent">
                  My Event
                </NavLink>
              </li>
            ) : (
              <li className={styles.navItem}>
                <NavLink className={styles.navLink} to="/login">
                  Log In
                </NavLink>
              </li>
            )}

            {user ? (
              <li className={styles.navItem}>
                <NavLink className={styles.navLink} onClick={handleOnLogOut}>
                  Log Out
                </NavLink>
              </li>
            ) : (
              <li className={styles.navItem}>
                <NavLink className={styles.navLink} to="/signup">
                  Sign Up
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
