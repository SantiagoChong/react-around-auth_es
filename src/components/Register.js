import React, {useState} from "react";
import * as auth from "../utils/auth";
import {Link, useNavigate} from "react-router-dom";
import InfoTooltip from "./InfoTooltip";

const Register = () => {
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
    setError(false);
  };

  const onRegister = (e) => {
    e.preventDefault();
    const {password, email} = values;
    auth
      .register({password, email})
      .then((res) => {
        console.log(res);
        if (res) {
          navigate("/signin", {state: "success"});
        } else {
          setError(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    setInfoToolOpen(true);
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
        <button type="submit" className="form__button">
          Registrarse
        </button>
        <Link to="/signin" className="form__link">
          ¿Ya eres miembro? Inicia sesión aquí
        </Link>
      </form>
      <InfoTooltip error={error} infoToolOpen={infoToolOpen} handleClose={handleCloseInfoTool}></InfoTooltip>
    </>
  );
};

export default Register;
