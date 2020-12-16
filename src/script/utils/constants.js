export const profileInputSelector = {
  nameSelector: '.profile__name',
  jobSelector: '.profile__job'
};

export const settings = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_invalid',
  inputErrorClass: 'popup__text_invalid',
});


export const CARD_TEMPLATE = document.querySelector(".template");
export const popupNewElement = document.querySelector('.newElement');
export const popupNewElementForm = popupNewElement.querySelector('.newElement-form');
export const popupNewElementFormInputTitle = popupNewElement.querySelector('.popup__element-title');
export const popupNewElementFormInputUrl = popupNewElement.querySelector('.popup__element-link')

export const buttonOpenPopupProfileEditor = document.querySelector('.profile__edit-btn');
export const buttonOpenPopupNewElement = document.querySelector('.profile__add-btn');


export const popupProfileEditor = document.querySelector('.profileEditor');
export const formPopupProfileEdit = popupProfileEditor.querySelector('.profileEditor-form');
export const nameInput = document.querySelector('.popup__name-input');
export const jobInput = document.querySelector('.popup__job-input');


export const elementContainer = document.querySelector('.elements');
export const initialCards = [{
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
