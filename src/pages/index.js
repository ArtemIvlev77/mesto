import './index.css';
import Api from '../script/components/Api.js';
import Card from '../script/components/Card.js';
import {
  FormValidator
} from '../script/components/FormValidator.js';
import Section from "../script/components/Section.js";
import PopupWithImage from "../script/components/PopupWithImage.js";
import PopupWithForm from "../script/components/PopupWithForm.js";
import UserInfo from "../script/components/UserInfo.js";
import {
  profileInputSelector,
  profileName,
  profileJob,
  avatarAuthor,
  buttonOpenPopupProfileEditor,
  buttonOpenPopupNewElement,
  formPopupProfileEdit,
  nameInput,
  jobInput,
  CARD_TEMPLATE,
  popupNewElementForm,
  elementContainer,
  settings,
  popupNewElementFormInputTitle,
  popupNewElementFormInputUrl
} from '../script/utils/constants.js'



////////////////////////////////////////////////////////////////////////////Project 8

const imagePreview = new PopupWithImage(".elementPreview");
imagePreview.setEventListener();

const makeNewCard = (item) => {
  return new Card(item, CARD_TEMPLATE, {
    handleCardClick: (name, link) => {
      imagePreview.open(name, link);
    },
  });
};






const userInfo = new UserInfo(profileInputSelector);

const editProfilePopup = new PopupWithForm({
  popupSelector: '.profileEditor',
  handleFormSubmit: ({
    name,
    job
  }) => {
    userInfo.setUserInfo({
      name,
      job
    });
  },
});
editProfilePopup.setEventListeners();



buttonOpenPopupProfileEditor.addEventListener('click', () => {
  editProfilePopup.open();
  const profileData = userInfo.getUserInfo();
  nameInput.value = profileData.name;
  jobInput.value = profileData.job;
  profileEditorValidator.toggleButtonState();
  profileEditorValidator.hideError(nameInput);
  profileEditorValidator.hideError(jobInput);
})


const newElementValidator = new FormValidator(popupNewElementForm, {
  settings
});

const profileEditorValidator = new FormValidator(formPopupProfileEdit, {
  settings
});

newElementValidator.enableValidation();
profileEditorValidator.enableValidation();

buttonOpenPopupNewElement.addEventListener('click', () => {
  addNewElementPopup.open();
  newElementValidator.disableNewCardSubmitButtonStatus();
  newElementValidator.hideError(popupNewElementFormInputTitle);
  newElementValidator.hideError(popupNewElementFormInputUrl);
  popupNewElementForm.reset();
});


//////////////////////////////////////////////////////project 9

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-20",
  headers: {
    authorization: "c991fcc7-9f95-4717-b779-f2f9eb8f4dbe",
    "Content-Type": "application/json",
  },
});



let userId = null;

api.getUserInfo().then((data) => {
    profileName.textContent = data.name;
    profileJob.textContent = data.about;
    avatarAuthor.src = data.avatar;
    userId = data._id;
    console.log(userId);
  })
  .catch((err) => {
    console.log(err);
  });

api.getInitialCards()
  .then((cards) => {
    renderCardList(cards);
  }).catch((err) => {
    console.log(err);
  });


const renderCardList = (cards) => {
  const cardList = new Section({
    items: cards,
    renderer: (item) => {
      const card = makeNewCard(item);
      const cardElement = card.render();
      cardList.addItem(cardElement);
    }
  }, elementContainer);
  cardList.renderItems();
};

const initCard = (item) => {
  const card = new Card(item, userId, )
}


const addNewElementPopup = new PopupWithForm({
  popupSelector: ".newElement",
  handleFormSubmit: (item) => {
    api.addCard({
      name: item.name,
      link: item.link
    })
      .then((data) => 
        render({
        name: data.name,
        link: data.link
      }),
        
    // const newCard = makeNewCard(item);
    // const cardElement = newCard.render();
    // cardList.addItem(cardElement)
)}
});

addNewElementPopup.setEventListeners();

