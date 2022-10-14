import { FormValidator } from "./FormValidator";
import { validationSettingsForAccount } from '../utils/constants.js';
import { useForm } from "../hooks/useForm";

import React from "react";

function Account({ name, title, onSubmit, textOnButton, children, withText }) {

  //используем рефы
  const formRef = React.useRef();
  const validatorRef = React.useRef();

  const { values, handleChange } = useForm({});

  //обработчик submit
  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit(values);
  }

  //активируем валидацию единожды
  React.useEffect(() => {
    validatorRef.current = new FormValidator(validationSettingsForAccount, formRef.current);
    validatorRef.current.enableValidation();
  }, []);

  //провалидируем форму при загрузке страницы
  React.useEffect(() => {
    validatorRef.current.validateOnOpen();
  }, []);

  return (

    <div className="account">
      <form className={`account__form account__form_type_${name}`}
        name={`account__form_type_${name}`}
        onSubmit={handleSubmit}
        ref={formRef}>
        <h2 className={`account__title account__title_type_${name}`}>{title}</h2>
        <fieldset className="account__fieldset">
          <label className="account__label-field">
            <input className="account__input account__input_type_email"
              id="input_type_email"
              placeholder="Email"
              type="email"
              name="email"
              value={values['email'] || ''}
              onChange={handleChange}
              required
            />
            <span className="account__error account__error_type_email" id="input_type_email-error"></span>
            <input className="account__input account__input_type_password"
              id="input_type_password"
              placeholder="Пароль"
              type="password"
              minLength="6"
              maxLength="16"
              name="password"
              value={values['password'] || ''}
              onChange={handleChange}
              required
            />
            <span className="account__error account__error_type_password" id="input_type_password-error"></span>
          </label>
          <button className={`account__button-submit ${withText ? "account__button-submit_type_with-text" : ""}`} id={`account __button-${name}`} type="submit">
            {textOnButton}
          </button>
        </fieldset>
      </form>
      {children}
    </div>

  );
}

export default Account;