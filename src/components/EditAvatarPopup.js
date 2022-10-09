import PopupWithForm from './PopupWithForm';
import React from "react";

function EditAvatarPopup(props) {

  //используем реф
  const avatarRef = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    //обновим аватар
    props.onUpdateAvatar(avatarRef.current.value);
  }

  //очистка инпута при открытии
  React.useEffect(() => {
    avatarRef.current.value = '';
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="update-avatar"
      title="Обновить аватар"
      textOnButton={props.isLoading ? 'Сохранение...' : 'Сохранить'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >

      <label className="popup__label-field">
        <input
          className="popup__input popup__input_type_avatar"
          id="input_type_avatar"
          placeholder="Ссылка на аватар"
          type="url"
          name="avatar"
          ref={avatarRef}
          required
        />
        <span className="popup__error popup__error_type_avatar" id="input_type_avatar-error"></span>

      </label>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;