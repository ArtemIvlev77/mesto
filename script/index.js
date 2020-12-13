import Card from './Card.js';
import {
  FormValidator
} from './FormValidator.js';
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import {
  profileInputSelector,
  buttonOpenPopupProfileEditor,
  buttonOpenPopupNewElement,
  formPopupProfileEdit,
  nameInput,
  jobInput,
  CARD_TEMPLATE,
  popupNewElementForm,
  elementContainer,
  initialCards,
    settings
} from './Constants.js'



////////////////////////////////////////////////////////////////////////////Project 8

const imagePreview = new PopupWithImage(".elementPreview");
imagePreview.setEventListener();

const makeNewCard = (item) => {
   return new Card (item, CARD_TEMPLATE, {
    handleCardClick: (name, link) => {
      imagePreview.open(name, link);
    },
  });
};

const cardList = new Section ({
  items:initialCards,
  renderer: (item) => {
    const card = makeNewCard(item);
      const cardElement = card.render();
      cardList.addItem(cardElement);
}}, elementContainer);
cardList.renderItems();


const addNewElementPopup = new PopupWithForm({
  popupSelector: ".newElement",
  handleFormSubmit: (item) => {
      const newCard = makeNewCard(item);
    const cardElement = newCard.render();
    cardList.addItem(cardElement)
  },
});

addNewElementPopup.setEventListeners();


buttonOpenPopupNewElement.addEventListener('click', () => {
  addNewElementPopup.open();
})

const userInfo = new UserInfo(profileInputSelector);

const editProfilePopup = new PopupWithForm({
popupSelector: '.profileEditor',
  handleFormSubmit: ({name, job}) => {
    userInfo.setUserInfo({name, job});
  },
});
editProfilePopup.setEventListeners();



buttonOpenPopupProfileEditor.addEventListener('click', () => {
  editProfilePopup.open();
  const profileData = userInfo.getUserInfo();
  nameInput.value = profileData.name;
  jobInput.value = profileData.job;
})


const newElementValidator = new FormValidator(popupNewElementForm, {
  settings
});
const profileEditorValidator = new FormValidator(formPopupProfileEdit, {
  settings
});

newElementValidator.enableValidation();
profileEditorValidator.enableValidation();
