export class FormValidator {
    constructor(data, formSelector) {
        this._formSelector = formSelector;
        this._formElement = data.formElement;
        this._inputElement = data.inputElement;
        this._submitButtonSelector = data.submitButtonSelector;
        this._inactiveButtonClass = data.inactiveButtonClass;
        this._inputErrorClass = data.inputErrorClass;
    }

    enableValidation() {
        
    }
 }