export class FormValidator {
  constructor(formSelector, {
    settings
  }) {
    this._formSelector = formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
  }

  _disableNewCardSubmitButtonStatus = (buttonElement) => {
    buttonElement.classList.add(this._inactiveButtonClass);
    buttonElement.disabled = true;
  }

  _showError(formSelector, inputSelector) {
    const errorElement = this._formSelector.querySelector(`#${inputSelector.id}-error`);
    errorElement.textContent = inputSelector.validationMessage;
    inputSelector.classList.add(this._inputErrorClass);
  }

  _hideError(formSelector, inputSelector) {
    const errorElement = this._formSelector.querySelector(`#${inputSelector.id}-error`);
    errorElement.textContent = "";
    inputSelector.classList.remove(this._inputErrorClass);
  }

  _checkInputValidity(formSelector, inputSelector) {
    if (inputSelector.checkValidity()) {
      this._hideError(this._formSelector, inputSelector);
    } else {
      this._showError(this._formSelector, inputSelector);
    }
  }

  toggleButtonState(form, buttonElement) {
    if (this._formSelector.checkValidity()) {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    } else {
      this._disableNewCardSubmitButtonStatus(buttonElement);
    }

  }

  _setEventListeners() {
    const inputElements = Array.from(this._formSelector.querySelectorAll(this._inputSelector));
    const buttonElement = this._formSelector.querySelector(this._submitButtonSelector);
    inputElements.forEach((inputSelector) => {

      inputSelector.addEventListener('input', (evt) => {
        this._checkInputValidity(this._formSelector, evt.target);
        this.toggleButtonState(this._formSelector, buttonElement);
      });
    });


    this.toggleButtonState(this._formSelector, buttonElement);
  }

  enableValidation() {
    this._formSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._disableNewCardSubmitButtonStatus(this._formSelector.querySelector(this._submitButtonSelector));
    });
    this._setEventListeners();
  }
}