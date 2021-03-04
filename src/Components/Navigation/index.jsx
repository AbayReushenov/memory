import React from 'react';
import { NavLink } from 'react-router-dom';
import './styles.css';

export default function Navigation() {
  return (
    <nav className="navigation">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/yuorCard">Yuor card</NavLink>
      <NavLink to="/createCard">Create Card</NavLink>
      <NavLink to="/profile">Profile</NavLink>
      <NavLink to="/logout">LogOut</NavLink>
    </nav>
  );
}
