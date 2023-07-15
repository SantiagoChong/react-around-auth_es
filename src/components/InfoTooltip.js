import React from "react";
import closeButton from "../images/close-icon.svg";
import successIcon from "../images/success-icon.svg";
import errorIcon from "../images/error-icon.svg";

const InfoTooltip = ({error, infoToolOpen, handleClose}) => {
  return (
    <div className={`popup ${infoToolOpen && "popup_opened"}`}>
      <div className="form">
        <img src={closeButton} alt="icono de cerrar" className="popup__toggle" onClick={handleClose} />
        <div className="popup__container popup__container_infoTooltip">
          {error ? (
            <>
              <img src={errorIcon} alt="icono de error" className="popup__image-icon" />
              <h1 className="popup__title popup__title_tooltip">Uy, algo salió mal. Por favor, inténtalo de nuevo.</h1>
            </>
          ) : (
            <>
              <img src={successIcon} alt="icono de aprobación" className="popup__image-icon" />
              <h1 className="popup__title popup__title_tooltip">¡Correcto! Ya estás registrado</h1>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoTooltip;
