import React from 'react';
import { NavLink } from 'react-router-dom';
import './styles.css';

export default function Navigation() {
  return (
    <nav className="navigation">
      <NavLink
        activeClassName="navigation_link_active"
        className="navigation_link"
        exact
        to="/"
      >
        Главная
      </NavLink>
      <NavLink
        activeClassName="navigation_link_active"
        className="navigation_link"
        to="/yuorCard"
      >
        Ваши Обьявления
      </NavLink>
      <NavLink
        activeClassName="navigation_link_active"
        className="navigation_link"
        to="/yourPayment"
      >
        Пополнить кошелек
      </NavLink>
      <NavLink
        activeClassName="navigation_link_active"
        className="navigation_link"
        to="/createCard"
      >
        Создать Запрос о помощи
      </NavLink>
      <NavLink
        activeClassName="navigation_link_active"
        className="navigation_link"
        to="/profile"
      >
        Профиль
      </NavLink>
    </nav>
  );
}
