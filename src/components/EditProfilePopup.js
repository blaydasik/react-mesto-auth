import PopupWithForm from "./PopupWithForm";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import {useForm} from "../hooks/useForm";

function EditProfilePopup(props) {

  const {values, handleChange, setValues} = useForm({});
  const currentUser = React.useContext(CurrentUserContext);

  //обработчик
  function handleSubmit(evt) {
    evt.preventDefault();
    //передаим значения управляемых компонентов во внешний обработчик
    props.onUpdateUser(values);
  }

  //получим данные пользователя в управляемые компоненты
  React.useEffect(() => {
    setValues(currentUser)
  }, [currentUser, setValues, props.isOpen]);

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      textOnButton={props.isLoading ? 'Сохранение...' : 'Сохранить'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >

      <label className="popup__label-field">
        <input className="popup__input popup__input_type_name"
          id="input_type_name"
          placeholder="Имя"
          type="text"
          minLength="2"
          maxLength="40"
          name="name"
          value={values['name'] || ''}
          onChange={handleChange}
          required
        />
        <span className="popup__error popup__error_type_name" id="input_type_name-error"></span>
        <input className="popup__input popup__input_type_about"
          id="input_type_about"
          placeholder="О себе"
          type="text"
          minLength="2"
          maxLength="200"
          name="about"
          value={values['about'] || ''}
          onChange={handleChange}
          required
        />
        <span className="popup__error popup__error_type_about" id="input_type_about-error"></span>
      </label>

    </PopupWithForm >
  )
}

export default EditProfilePopup;