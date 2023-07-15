import React, {useState} from "react";
import logo from "../images/logo.svg";
import {Link, useMatch} from "react-router-dom";
import burgerMenu from "../images/burger-menu.svg";
import closeButton from "../images/close-icon.svg";

const Header = ({handleSignOut, email}) => {
  const [open, setOpen] = useState(false);

  function handleMenu() {
    setOpen(!open);
  }

  function onSignOut() {
    handleSignOut();
    setOpen(false);
  }

  return (
    <>
      <header className={`header ${open && "header_opened"}`}>
        <div className="header__container">
          <img className="logo" src={logo} alt="logo" />
          {useMatch("/signup") && (
            <Link to="/signin" className="header__link">
              Iniciar sesión
            </Link>
          )}
          {useMatch("/signin") && (
            <Link to="/signup" className="header__link">
              Registrarse
            </Link>
          )}

          {useMatch("/") && (
            <>
              <div className={`header__user-info ${open && "header__user-info_opened"}`}>
                <span className="header__email">{email}</span>
                <button className="header__logout" onClick={onSignOut}>
                  Cerrar sesión
                </button>
              </div>
              {open ? (
                <img src={closeButton} alt="close menu" className="header__close-icon" onClick={handleMenu} />
              ) : (
                <img src={burgerMenu} alt="menu" className="header__menu-icon" onClick={handleMenu} />
              )}
            </>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
