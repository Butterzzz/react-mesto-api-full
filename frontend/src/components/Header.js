import React from 'react';
import { useLocation, Link } from "react-router-dom";
import logo from '../images/header-logo.svg';

function Header({ email, signOut }) {

  const location = useLocation();

  return (
    <header className="header">
      <a className="header__logo" href="/">
        <img className="header__logo" src={logo} alt="Логотип сервиса Mesto" />
      </a>

      {location.pathname === "/" && (
        <div className="header__container">
          <p className="header__email">{email}</p>
          <button className="header__button" onClick={signOut}>Выйти</button>
        </div>
      )}

      {location.pathname === "/sign-up" && (
        <div className="header__container">
          <Link to="/sign-in" className="header__link">Войти</Link>
        </div>
      )}

      {location.pathname === "/sign-in" && (
        <div className="header__container">
          <Link to="/sign-up" className="header__link">Регистрация</Link>
        </div>
      )}

    </header >
  );
}

export default Header;