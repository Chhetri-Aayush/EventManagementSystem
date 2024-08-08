import React, { useState } from "react";
import { useEvents } from "../../Store/EventContext";
import { Link } from "react-router-dom";
import styles from "./eventlist.module.css";
import music from "../../assets/music.jpg";
import tech from "../../assets/tech.jpg";
import cultural from "../../assets/culture.jpeg";
import arts from "../../assets/arts.jpg";

function EventList() {
  const [activeLink, setActiveLink] = useState("all");
  const { events } = useEvents();

  const handleNavLinkClick = (link) => {
    setActiveLink(link);
  };

  const filteredEvents = events.filter((event) => {
    if (activeLink === "all") {
      return true;
    }
    switch (activeLink) {
      case "tech":
        return event.category_id === 2;
      case "music":
        return event.category_id === 3;
      case "cultural":
        return event.category_id === 4;
      case "art":
        return event.category_id === 1;
      default:
        return false;
    }
  });

  const categoryImageMap = {
    1: arts,
    2: tech,
    3: music,
    4: cultural,
  };
  const formatTime = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(":");
    const date = new Date();
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
    date.setSeconds(parseInt(seconds, 10));

    return date.toLocaleTimeString();
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.navContainer}>
          <ul className={styles.nav}>
            <li
              className={`${styles.navItem} ${
                activeLink === "all" && styles.active
              } `}
            >
              <a
                className={styles.navLink}
                onClick={() => handleNavLinkClick("all")}
              >
                All
              </a>
            </li>
            <li
              className={`${styles.navItem} ${
                activeLink === "tech" && styles.active
              } `}
            >
              <a
                className={styles.navLink}
                onClick={() => handleNavLinkClick("tech")}
              >
                Tech
              </a>
            </li>
            <li
              className={`${styles.navItem} ${
                activeLink === "music" && styles.active
              } `}
            >
              <a
                className={styles.navLink}
                onClick={() => handleNavLinkClick("music")}
              >
                Music
              </a>
            </li>
            <li
              className={`${styles.navItem} ${
                activeLink === "cultural" && styles.active
              } `}
            >
              <a
                className={styles.navLink}
                onClick={() => handleNavLinkClick("cultural")}
              >
                Cultural
              </a>
            </li>
            <li
              className={`${styles.navItem} ${
                activeLink === "art" && styles.active
              } `}
            >
              <a
                className={styles.navLink}
                onClick={() => handleNavLinkClick("art")}
              >
                Art
              </a>
            </li>
          </ul>
        </div>
        <hr className={styles.separator} />
        <div className={styles.eventContainer}>
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => {
              const eventImage = categoryImageMap[event.category_id];
              return (
                <Link
                  to={`/events/${event.id}`}
                  key={event.id}
                  className={styles.cardLink}
                >
                  <div className={styles.card}>
                    <img
                      src={eventImage}
                      className={styles.cardImg}
                      alt="Event"
                    />
                    <div className={styles.cardBody}>
                      <p className={styles.cardTextName}>{event.name}</p>
                      <p className={styles.cardTextDateAndTime}>
                        Date: {new Date(event.event_date).toLocaleDateString()}{" "}
                        Time: {formatTime(event.event_time)}
                      </p>
                      <p className={styles.cardTextLocation}>{event.venue}</p>
                      <p className={styles.cardTextPrice}>{event.price}</p>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <div>No events available.</div>
          )}
        </div>
      </div>
    </>
  );
}

export default EventList;
