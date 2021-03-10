import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Logo from '../../image/logo_project.png';
import './styles.css';

export default function Navigation(props) {
  const user = useSelector((state) => state.user);

  const handlerLogInClick = () => {
    props.setviewRegisterForm((prev) => {
      if (prev === true) {
        return false;
      }
    });
    props.setviewLoginForm(true);
    console.log('handlerLogInClick');
  };

  const handlerRegisterClick = () => {
    props.setviewLoginForm((prev) => {
      if (prev === true) {
        return false;
      }
    });
    props.setviewRegisterForm(true);
    console.log('handlerRegisterClick');
  };

  if (!user.uid) {
    return (
      <nav className="navigation">
        <img src={Logo} alt="Logo project" className="navigation__logo" />
        <div className="navigation_links">
          <NavLink
            activeClassName="navigation_link_active"
            className="navigation_link"
            exact
            to="/"
          >
            О проекте
          </NavLink>
          <NavLink
            activeClassName="navigation_link_active"
            className="navigation_link"
            exact
            to="/about"
          >
            О нас
          </NavLink>
          <NavLink
            activeClassName="navigation_link_active"
            className="navigation_link"
            exact
            to="/performers"
          >
            Исполнители
          </NavLink>
        </div>
        <div className="navigation_action">
          <button
            className="navigation_action_btn"
            type="button"
            onClick={handlerLogInClick}
          >
            Войти
          </button>
          <button
            className="navigation_action_btn"
            type="button"
            onClick={handlerRegisterClick}
          >
            Зарегестрироваться
          </button>
        </div>
      </nav>
    );
  }
  return (
    <nav className="navigation">
      <NavLink
        activeClassName="navigation_link_active"
        className="navigation_link"
        onClick={() => {
          props.setprofileView(() => {
            return false;
          });
        }}
        exact
        to="/"
      >
        Главная
      </NavLink>
      <NavLink
        activeClassName="navigation_link_active"
        className="navigation_link"
        onClick={() => {
          props.setprofileView(() => {
            return false;
          });
        }}
        to="/yuorCard"
      >
        Ваши Обьявления
      </NavLink>
      <NavLink
        activeClassName="navigation_link_active"
        className="navigation_link"
        onClick={() => {
          props.setprofileView(() => {
            return false;
          });
        }}
        to="/waitInviteList"
      >
        Ждете инвайта
      </NavLink>
      <NavLink
        activeClassName="navigation_link_active"
        className="navigation_link"
        onClick={() => {
          props.setprofileView(() => {
            return false;
          });
        }}
        to="/workList"
      >
        В работе
      </NavLink>
      <NavLink
        activeClassName="navigation_link_active"
        className="navigation_link"
        onClick={() => {
          props.setprofileView(() => {
            return false;
          });
        }}
        to="/createCard"
      >
        Создать Запрос о помощи
      </NavLink>
      <button
        type="button"
        className="navigation_link"
        onClick={() => {
          props.setprofileView((prev) => {
            if (prev === true) {
              return false;
            }
            return true;
          });
        }}
      >
        Профиль
      </button>
    </nav>
  );
}
