import React from 'react';
import { NavLink } from 'react-router-dom';
import './styles.css';

export default function Navigation() {
  return (
    <nav className="navigation">
      Navigation
      <NavLink to="/register">Регистрация</NavLink>
      <NavLink to="/login">Авторизация</NavLink>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/yourPayment">Your Payment</NavLink>
      <NavLink to="/yourCard">Your Cards</NavLink>
      <NavLink to="/createCard">Create Card</NavLink>
      <NavLink to="/profile">Profile</NavLink>
      <NavLink to="/logout">LogOut</NavLink>
    </nav>
  );
}
