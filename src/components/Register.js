import React, {useState} from "react";
import * as auth from "../utils/auth";
import {Link, useNavigate} from "react-router-dom";
import InfoTooltip from "./InfoTooltip";

export default function Register() {
  const history = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [infoToolOpen, setInfoToolOpen] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setValues({...values, [name]: value});
    console.log(values);
  };

  const handleCloseInfoTool = () => {
    setInfoToolOpen(false);
    setError(false);
  };

  const onRegister = (e) => {
    e.preventDefault();
    auth.register(values).then((res) => {
      if (res) {
        history("/signin", {state: "success"});
      } else {
        setError(true);
      }
      setInfoToolOpen(true);
    });
  };

  return (
    <>
      <form className="form__container" onSubmit={onRegister}>
        <p className="form__title">Regístrate</p>
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
        <button type="submit" onClick={onRegister} className="form__button">
          Registrarse
        </button>
        <Link to="/signin" className="form__link">
          ¿Ya eres miembro? Inicia sesión aquí
        </Link>
      </form>

      <InfoTooltip error={error} isOpen={infoToolOpen} onClose={handleCloseInfoTool}></InfoTooltip>
    </>
  );
}
