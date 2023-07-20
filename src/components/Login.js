import React, {useState} from "react";
import * as auth from "../utils/auth";
import {Link, useNavigate} from "react-router-dom";
import InfoTooltip from "./InfoTooltip";

const Login = ({handleLogin}) => {
  const navigate = useNavigate();
  const [values, setValues] = useState({});
  const [infoToolOpen, setInfoToolOpen] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setValues({...values, [name]: value});
  };

  const handleCloseInfoTool = () => {
    setInfoToolOpen(false);
    navigate("/signin", {state: {}});
  };

  const onLogin = (e) => {
    e.preventDefault();
    auth
      .authorize(values)
      .then((data) => {
        if (data) {
          setInfoToolOpen(true);
          setValues({email: "", pasword: ""});
          navigate("/");
          handleLogin();
        } else {
          setError(true);
          setInfoToolOpen(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <form className="form__container" onSubmit={onLogin}>
        <p className="form__title">Inicia Sesión</p>
        <fieldset className="form__fieldset">
          <label className="form__label"></label>
          <input
            type="email"
            className="form__input"
            name="email"
            placeholder="Correo electrónico"
            required
            minLength="2"
            maxLength="40"
            onChange={handleChange}
          />
          <span className="name-error popup__item-error"></span>

          <label className="form__label"></label>
          <input
            type="password"
            className="form__input"
            name="password"
            placeholder="Contraseña"
            required
            minLength="2"
            maxLength="40"
            onChange={handleChange}
          />
          <span className="description-error form__item-error"></span>
        </fieldset>
        <button type="submit" onClick={onLogin} className="form__button">
          Iniciar Sesión
        </button>
        <Link to="/signup" className="form__link">
          ¿Aún no eres miembro? Regístrate aquí
        </Link>
      </form>
      <InfoTooltip error={error} isOpen={infoToolOpen} onClose={handleCloseInfoTool}></InfoTooltip>
    </>
  );
};

export default Login;
