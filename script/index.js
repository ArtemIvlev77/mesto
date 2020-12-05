import {
  Card
} from './Card.js';
import {
  FormValidator
} from './FormValidator.js';

const popupProfileEditor = document.querySelector('.profileEditor');
const popupNewElement = document.querySelector('.newElement');
export const popupElementPreview = document.querySelector('.elementPreview');

const buttonOpenPopupProfileEditor = document.querySelector('.profile__edit-btn');
const buttonOpenPopupNewElement = document.querySelector('.profile__add-btn');

const closeButtonPopupProfileEditor = popupProfileEditor.querySelector('.profileEditor-closeBtn');
const closeButtonPopupNewElement = popupNewElement.querySelector('.newElement-closeBtn');
const closeButtonPopupElementPreview = popupElementPreview.querySelector('.elementPreview-closeBtn');

const formPopupProfileEdit = popupProfileEditor.querySelector('.profileEditor-form');
const nameInput = document.querySelector('.popup__name-input');
const jobInput = document.querySelector('.popup__job-input');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');


const popupNewElementForm = popupNewElement.querySelector('.newElement-form');
const popupNewElementTitle = popupNewElementForm.querySelector('.popup__element-title');
const popupNewElementImage = popupNewElementForm.querySelector('.popup__element-link');

const elementContainer = document.querySelector('.elements');
const initialCards = [{
  name: 'Архыз',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  alt: 'Архыз'
}, {
  name: 'Челябинская область',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  alt: 'Челябинская область'
}, {
  name: 'Иваново',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  alt: 'Иваново'
}, {
  name: 'Камчатка',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  alt: 'Камчатка'
}, {
  name: 'Холмогорский район',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  alt: 'Холмогорский район'
}, {
  name: 'Байкал',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  alt: 'Байкал'
}];


function addElement(data) {
  const element = new Card(data.name, data.link, '.template')
  const newElement = element.render()
  elementContainer.append(newElement);
}

initialCards.forEach(addElement);

export const openPopup = (popup) => {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', (evt) =>  {
    if (evt.key === "Escape") {
      closePopup(popup);
    }
  });
};


const popupNewElementReset = () => {
  const form = popupNewElement.querySelector('.popup__form');
  const spanError = Array.from(form.querySelectorAll(".popup__error"));
  spanError.forEach(value => {
    value.textContent = '';
  });
  form.reset();
};

const closePopupByClickOnOverlay = (evt) => {
  const activePopup = document.querySelector('.popup_is-opened');
  if (evt.target === evt.currentTarget) {
    closePopup(activePopup);
  }
};

const closePopup = (popup) => {
  popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopup);
    document.removeEventListener('click', closePopupByClickOnOverlay);
}


const handleSubmitProfile = (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfileEditor);
};


const handleSubmitNewElement = (evt) => {
  evt.preventDefault();

  function addElement(name, link) {
    const element = new Card(name, link, '.template')
    const newElement = element.render();
    elementContainer.prepend(newElement);
  }

  addElement(popupNewElementTitle.value, popupNewElementImage.value);
  popupNewElementForm.reset();
  closePopup(popupNewElement);
};



const bindListeners = () => {
  buttonOpenPopupProfileEditor.addEventListener('click', () => {
    openPopup(popupProfileEditor);
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
  } );
  buttonOpenPopupNewElement.addEventListener('click', () => openPopup(popupNewElement));
  buttonOpenPopupNewElement.addEventListener('click', popupNewElementReset);
  closeButtonPopupNewElement.addEventListener('click', () => closePopup(popupNewElement));
  closeButtonPopupProfileEditor.addEventListener('click', () => closePopup(popupProfileEditor));
  closeButtonPopupElementPreview.addEventListener('click', () => closePopup(popupElementPreview));
  formPopupProfileEdit.addEventListener('submit', handleSubmitProfile);
  popupNewElement.addEventListener('submit', handleSubmitNewElement);
  popupNewElement.addEventListener('click', closePopupByClickOnOverlay);
  popupProfileEditor.addEventListener('click', closePopupByClickOnOverlay);
  popupElementPreview.addEventListener('click', closePopupByClickOnOverlay);
};

bindListeners();
const settings = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_invalid',
  inputErrorClass: 'popup__text_invalid',
});

const newElementValidator = new FormValidator(popupNewElementForm, {
  settings
});
const profileEditorValidator = new FormValidator(formPopupProfileEdit, {
  settings
});

newElementValidator.enableValidation();
profileEditorValidator.enableValidation();