//параметры валидации:
//formSelector - класс валидируемой формы
//fieldsetSelector - общий класс для fildset'ов
//inputSelector - общий класс для валидируемых inputs
//submitButtonSelector - общий класс для кнопок submit
//inactiveButtonClass - модификатор для неактивного состояния кнопки submit
//inputErrorClass - модификатор для невалидного состояния iтput
//errorClass - модификатор для активного состояния ошибки

export class FormValidator {

  constructor(validationSettings, validatingForm) {
    this._validationSettings = validationSettings; 
    this._validatingForm = validatingForm;
    //найдем все inputs в наборе полей
    this._inputs = Array.from(validatingForm.querySelectorAll(this._validationSettings.inputSelector));
    //найдем кнопку submit
    this._buttonSubmit = validatingForm.querySelector(this._validationSettings.submitButtonSelector);  
  }

  //метод, отображающий сообщение об ошибке
  _showErrorMessage(inputsItem) {
     //определим span для выведения ошибки
    const str = '.popup__error' + `${inputsItem.id}`.slice(5);
    const errorItem = this._validatingForm.querySelector(str);
    //подсветим input с ошибкой
    inputsItem.classList.add(this._validationSettings.inputErrorClass);
    //запишем текст ошибки в span
    errorItem.textContent = inputsItem.validationMessage;
    //отобразим span с ошибкой
    errorItem.classList.add(this._validationSettings.errorClass);
  }

  //метод, скрывающий сообщение об ошибки
  _hideErrorMessage(inputsItem) {
    //определим span, отображающий ошибку
    const str = '.popup__error' + `${inputsItem.id}`.slice(5);
    const errorItem = this._validatingForm.querySelector(str);
    //уберем подсветку input с ошибкой
    inputsItem.classList.remove(this._validationSettings.inputErrorClass);
    //удалим текст ошибки в span
    errorItem.textContent = '';
    //скроем span с ошибкой
    errorItem.classList.remove(this._validationSettings.errorClass);
  }

  //метод, отображающий или скрывающий сообщение об ошибке на основании 
  //валидности input 
  _validateInput(inputsItem) {
    if (inputsItem.validity.valid) {
      this._hideErrorMessage(inputsItem);
    } else {
      this._showErrorMessage(inputsItem);
    }
  }

  //метод, проверяющий набор inputs на валидность
  //true - прошел проверку
  _checkInput() {
    //проверим, есть ли хотя бы один невалидный input
    //если true, то нашелся хотя бы один невалидный input
    return !this._inputs.some((inputsItem) => {
      //вызывается пока не вернется true, а мы ищем хотя бы один невалидный 
      return !inputsItem.validity.valid;
    });
  }

  //метод, меняющий состояние кнопки submit на основании валидности inputs
  _toggleButtonState() {
    //проверим массив inputs на валидность
    if (this._checkInput(this._inputs)) {
      this._buttonSubmit.removeAttribute("disabled");
    } else {
      this._buttonSubmit.setAttribute("disabled", "disabled");
    }
  }

  //метод, устанавливающий обработчики
  _setEventListener() {    
    //навесим обработчики на ввод в inputs  
    this._inputs.forEach((inputsItem) => {
      inputsItem.addEventListener('input', () => {
        //отобразим или скроем ошибку на основании валидности input
        this._validateInput(inputsItem);
        //определим состояние кнопки по результатам валидации
        this._toggleButtonState();
      });
    });
  }

  //публичный метод, включающий валидацию
  enableValidation() {
    this._setEventListener();
  }

  //публичный метод, производящий валидацию формы при открытии popup
  validateOnOpen() {
    //определим состояние кнопки по результатам валидации
    this._toggleButtonState();
    //очистим ошибки
    this._inputs.forEach((inputsItem) => this._hideErrorMessage(inputsItem));
  }
}