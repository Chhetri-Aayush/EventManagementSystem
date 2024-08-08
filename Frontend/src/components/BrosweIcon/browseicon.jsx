import React from "react";
import { FaMusic } from "react-icons/fa";
import { FcEngineering } from "react-icons/fc";
import { NavLink } from "react-router-dom";
import "./browseicon.css";
import { FaPaintBrush } from "react-icons/fa";
import { GiByzantinTemple } from "react-icons/gi";

const IconCard = ({ Icon, title, link }) => (
  <NavLink to={link} className="icon-category-card">
    <div className="icon-wrapper">
      <Icon className="icon" />
    </div>
    <p className="icon-title">{title}</p>
  </NavLink>
);

function BrowseIcon() {
  const categories = [
    { Icon: FcEngineering, title: "Tech", link: "/tech" },
    { Icon: FaMusic, title: "Music", link: "/music" },
    { Icon: FaPaintBrush , title: "Arts", link: "/arts" },
    {
      Icon: GiByzantinTemple,
      title: "Cultural",
      link: "/cultural",
    },
  ];

  return (
    <section className="icon-category-browse">
      {categories.map((category, index) => (
        <IconCard key={index} {...category} />
      ))}
    </section>
  );
}

export default BrowseIcon;
