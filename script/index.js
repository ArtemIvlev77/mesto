

const popup = document.querySelector('.popup');
const popupProfileEditor = document.querySelector('.popup__ProfileEditor');
const popupNewElement = document.querySelector('.popup__new-element');
const popupElementPreview = document.querySelector('.popup__element-preview');

const elementTemplate = document.querySelector('#element__template');
const elementContainer = document.querySelector('.elements');

const buttonOpenPopupProfileEditor = document.querySelector('.profile__edit-btn');
const buttonOpenPopupNewElement = document.querySelector('.profile__add-btn');
const buttonOpenPopupElementPreview = document.querySelector('.element__image'); // надо исправить с evt.target


const closeButtonPopupProfileEditor = popupProfileEditor.querySelector('.popup__profile-editor_close-btn');
const closeButtonPopupNewElement = popupNewElement.querySelector('.popup__new-element__close-btn');
const closeButtonPopupElementPreview = popupElementPreview.querySelector('.popup__element-preview_close-btn');

const saveButtonProfileEditor = popupProfileEditor.querySelector('.popup_profile-editor_save-btn');


const formPopupProfileEdit = popupProfileEditor.querySelector('.popup__Profile-editor__form');

const formElement = popupProfileEditor.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__name-input');
const jobInput = document.querySelector('.popup__job-input');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
nameInput.value = profileName.textContent;
jobInput.value = profileJob.textContent;


const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 




initialCards.forEach((data) => {
  const elementCard = elementTemplate.cloneNode(true).content;
  const element = elementCard.querySelector('.element');
  const elementTitle = elementCard.querySelector('.element__title');
  const elementImage = elementCard.querySelector('.element__image');

  elementTitle.textContent = data.name;
  elementImage.src = data.link;
  elementImage.alt = data.name;

  elementContainer.append(elementCard);
});





const togglePopup = (popup) => {
  popup.classList.toggle('popup_is-opened');
};

const handlerSubmitProfile = (evt) => {
evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  togglePopup(popupProfileEditor);
};



const bindListeners = () => {
  buttonOpenPopupProfileEditor.addEventListener('click', () => togglePopup(popupProfileEditor));
  buttonOpenPopupNewElement.addEventListener('click', () => togglePopup(popupNewElement));
  buttonOpenPopupElementPreview.addEventListener('click', () => togglePopup(popupElementPreview));
  closeButtonPopupProfileEditor.addEventListener('click', () => togglePopup(popupProfileEditor));
  closeButtonPopupNewElement.addEventListener('click', () => togglePopup(popupNewElement));
  closeButtonPopupElementPreview.addEventListener('click', () => togglePopup(popupElementPreview));
  formPopupProfileEdit.addEventListener('submit', handlerSubmitProfile);
};

bindListeners();




// const popup = document.querySelector(".popup");
// const buttonOpenForm = document.querySelector(".profile__edit-btn");
// const buttonCloseForm = popup.querySelector(".popup__close-btn");

// const formElement = popup.querySelector('.popup__form');
// const nameInput = formElement.querySelector('.popup__name-input');
// const jobInput = formElement.querySelector('.popup__job-input');
// const profileName = document.querySelector('.profile__name');
// const profileJob = document.querySelector('.profile__job');

// const formToggle = () => {
//   popup.classList.toggle("popup_is-opened");
//   nameInput.value = profileName.textContent;
//   jobInput.value = profileJob.textContent;
// };




// buttonOpenForm.addEventListeaner("click", formToggle);
// buttonCloseForm.addEventListener("click", formToggle);

// function formSubmitHandler(evt) {
//   evt.preventDefault();  
//   profileName.textContent = nameInput.value;
//   profileJob.textContent = jobInput.value;
//   formToggle();
// }



// formElement.addEventListener('submit', formSubmitHandler);