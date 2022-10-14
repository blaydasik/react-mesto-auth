//параметры валидации:
//formSelector - общий класс для валидируемых форм
//fieldsetSelector - общий класс для fildset'ов
//inputSelector - общий класс для валидируемых inputs
//submitButtonSelector - общий класс для кнопок submit
//inactiveButtonClass - модификатор для неактивного состояния кнопки submit
//inputErrorClass - модификатор для невалидного состояния iтput
//errorClass - модификатор для активного состояния ошибки
//spanClass - общий класс для span, выводящих ошибку
export const validationSettingsForPopup = {
  formSelector: '.popup__form',
  fieldsetSelector: '.popup__fieldset',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  spanClass: 'popup__error'
};

export const validationSettingsForAccount = {
  formSelector: '.account__form',
  fieldsetSelector: '.account__fieldset',
  inputSelector: '.account__input',
  submitButtonSelector: '.account__button-submit',
  inactiveButtonClass: 'account__button-save_disabled',
  inputErrorClass: 'account__input_type_error',
  errorClass: 'account__error_visible',
  spanClass: 'account__error'
};

//параметры для запросов к серверу
export const apiSettings = {
  link: 'https://mesto.nomoreparties.co/v1/cohort-48',
  headers: {
    authorization: 'cc89d0bb-cee2-4a96-a369-74755d4b41b1',
    'Content-Type': 'application/json'
  }
}