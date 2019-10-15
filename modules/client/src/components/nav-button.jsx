import "./nav-button.scss";

import React from "react";
import { NavLink } from "react-router-dom";

export default function NavButton({ selected, route, text, ...props }) {
  return (
    <NavLink
      {...props}
      className={`nav-button ${
        selected ? "nav-button-selected" : "nav-button-unselected"
      }`}
      to={route}
      activeClassName="nav-button-active"
    >
      <div>
        <h3>{text}</h3>
      </div>
    </NavLink>
  );
}
