import React, {useState} from "react";
import * as auth from "../utils/auth";
import {Link, useNavigate} from "react-router-dom";
import InfoTooltip from "./InfoTooltip";

export default function Login(props) {
  const history = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [infoToolOpen, setInfoToolOpen] = React.useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;
    setValues({...values, [name]: value});
    console.log(values);
  };

  const handleCloseInfoTool = () => {
    setInfoToolOpen(false);
    history("/signin", {state: {}});
  };

  const onLogin = (e) => {
    e.preventDefault();
    auth
      .authorize({values})
      .then((data) => {
        if (data.token) {
          navigate("/");
          props.handleLogin();
        }
      })
      .catch((err) => {
        navigate("/signin", {state: {error: err}});
        props.handleLogin();
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
            value={values.email}
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
            value={values.password}
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
      <InfoTooltip error={true} isOpen={infoToolOpen} onClose={handleCloseInfoTool}></InfoTooltip>
    </>
  );
}
