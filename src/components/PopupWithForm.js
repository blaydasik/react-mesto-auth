import { FormValidator } from "./FormValidator";
import { validationSettings } from '../utils/constants.js';
import React from "react";

function PopupWithForm({ isOpen, onClose, name, title, textOnButton, children, onSubmit }) {

  //используем рефы
  const formRef = React.useRef();
  const validatorRef = React.useRef();

  //активируем валидацию единожды
  React.useEffect(() => {
    validatorRef.current = new FormValidator(validationSettings, formRef.current);
    validatorRef.current.enableValidation();
  }, []);

  //провалидируем форму при открытии попапа
  React.useEffect(() => {
    if (isOpen) {
      validatorRef.current.validateOnOpen();
    }
  }, [isOpen]);

  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button className="popup__button-close" name="popup__button-close"
          aria-label='button-close' type="button" onClick={onClose} />
        <form className={`popup__form popup__form_type_${name}`}
          name={`popup__form_type_${name}`}
          onSubmit={onSubmit}
          ref={formRef}>
          <h2 className={`popup__title popup__title_type_${name}`}>{title}</h2>
          <fieldset className="popup__fieldset">
            {children}
            <button className="popup__button-save" id={`popup__button-${name}`}
              type="submit">{textOnButton}</button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;