import PopupWithForm from './PopupWithForm';
import React from "react";
import { useForm } from "../hooks/useForm";

function AddPlacePopup(props) {

  const { values, handleChange, setValues } = useForm({});

  //обработчик
  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace(values);
  }

  //очистка инпутов при открытии
  React.useEffect(() => {
    setValues({});
  }, [props.isOpen, setValues]);

  return (
    <PopupWithForm
      name="add-card"
      title="Новое фото"
      textOnButton={props.isLoading ? 'Создание...' : 'Создать'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >

      <label className="popup__label-field">
        <input
          className="popup__input popup__input_type_title"
          id="input_type_title"
          placeholder="Название"
          type="text"
          minLength="2"
          maxLength="30"
          name="name"
          value={values['name'] || ''}
          onChange={handleChange}
          required />
        <span className="popup__error popup__error_type_title" id="input_type_title-error"></span>
        <input className="popup__input popup__input_type_link"
          id="input_type_link"
          placeholder="Ссылка на картинку"
          type="url"
          name="link"
          value={values['link'] || ''}
          onChange={handleChange}
          required />
        <span className="popup__error popup__error_type_link" id="input_type_link-error"></span>
      </label>

    </PopupWithForm>
  )
}

export default AddPlacePopup;