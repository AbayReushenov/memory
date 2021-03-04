import React from 'react';
import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav className="navigation">
      Navigation
      <Link to="/register">Регистрация</Link>
      <Link to="/login">Авторизация</Link>
    </nav>
  );
}
