function showError(formElement, input, {inputErrorClass}) {
  const errorElement = formElement.querySelector(`#${input.id}-error`);
  errorElement.textContent = input.validationMessage;
  input.classList.add(inputErrorClass);
}

function hideError (formElement, input, {inputErrorClass}) {
  const errorElement = formElement.querySelector(`#${input.id}-error`);
  errorElement.textContent ="";
  input.classList.remove(inputErrorClass);
}

function checkInputValidity(formElement, input, {...rest}) {
  if (input.checkValidity()) {
    hideError(formElement, input, {...rest});
  } else {
    showError(formElement, input, {...rest});
  }
}

function toggleButtonState(formElement, buttonElement, {inactiveButtonClass, ...rest}) {
  if (formElement.checkValidity({...rest})) {
    buttonElement.classList.remove( inactiveButtonClass);
    buttonElement.disabled = false;
  } else {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  }
}

/**
 * @param inactiveButtonClass
 * @param formElement
 */
function setEventListeners(formElement, {inputSelector, submitButtonSelector, ...rest}) {
  const inputElements = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  inputElements.forEach((input) => {
    input.addEventListener('input', (evt) => {
      checkInputValidity(formElement, evt.target, {...rest});
      toggleButtonState(formElement, buttonElement, {...rest});
    });
  });

  toggleButtonState(formElement, buttonElement, {...rest});
}

function enableValidation({ formSelector, ...rest }) {
  const formElements = Array.from(document.querySelectorAll(formSelector));
  formElements.forEach(form => {
    form.addEventListener('submit', (evt) => {
        evt.preventDefault();
    });
    setEventListeners(form, {...rest});
  });
}



enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_invalid',
  inputErrorClass: 'popup__text_invalid',
  });