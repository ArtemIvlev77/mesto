export class FormValidator {
  constructor(formSelector, {
    settings
  }) {
    this._formSelector = formSelector;
    this.inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._buttonElement = this._formSelector.querySelector(this._submitButtonSelector);
  }

  _showError(input) {
    const errorElement = this._formSelector.querySelector(`#${input.id}-error`);
    errorElement.textContent = input.validationMessage;
    input.classList.add(this._inputErrorClass);
  }

  hideError(input) {
    const errorElement = this._formSelector.querySelector(`#${input.id}-error`);
    errorElement.textContent = "";
    input.classList.remove(this._inputErrorClass);
  }

  _checkInputValidity(input) {
    if (input.checkValidity()) {
      this.hideError(input);
    } else {
      this._showError(input);
    }
  }

  disableSubmitBtn() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  }

  toggleButtonState() {
    if (this._formSelector.checkValidity()) {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    } else {
      this.disableSubmitBtn(this._buttonElement);
    }
  }

  _setEventListeners() {
    const inputElements = Array.from(this._formSelector.querySelectorAll(this.inputSelector));
    inputElements.forEach((input) => {
      input.addEventListener('input', (evt) => {
        this.toggleButtonState(this._buttonElement);
        this._checkInputValidity(evt.target);
      });
    });
    this.toggleButtonState(this._buttonElement);
  }

  enableValidation() {
    this._formSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}