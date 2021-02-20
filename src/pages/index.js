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
  profileEditAvatarBtn,
  buttonOpenPopupProfileEditor,
  buttonOpenPopupNewElement,
  formPopupProfileEdit,
  formPopupEditAvatar,
  nameInput,
  jobInput,
  CARD_TEMPLATE,
  popupNewElementForm,
  elementContainer,
  settings,
  popupNewElementFormInputTitle,
  popupNewElementFormInputUrl,
  popupEditAvatar,
  popupAvatarLink
} from '../script/utils/constants.js'
import PopupSubmit from '../script/components/PopupSubmit.js';


let userId = null;

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-20",
  headers: {
    authorization: "c991fcc7-9f95-4717-b779-f2f9eb8f4dbe",
    "Content-Type": "application/json",
  },
});

api.getUserInfo().then((data) => {
    profileName.textContent = data.name;
    profileJob.textContent = data.about;
    avatarAuthor.src = data.avatar;
    userId = data._id;
  })
  .catch((err) => {
    console.log(err);
  });

const userInfo = new UserInfo(profileInputSelector);

const editUserInfoHandler = (data) => {
  api.editUserInfo(data.name, data.job)
    .then(() => {
      userInfo.setUserInfo(data.name, data.job);
      editProfilePopup.close();
    }).catch((err) => {
      console.log(err)
    });
}

const editProfilePopup = new PopupWithForm(
  '.profileEditor',
  editUserInfoHandler
);
editProfilePopup.setEventListeners();

const imagePreview = new PopupWithImage(".elementPreview");
imagePreview.setEventListener();



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

const avatarEditorValidator = new FormValidator(formPopupEditAvatar, {
  settings
})

newElementValidator.enableValidation();
profileEditorValidator.enableValidation();
avatarEditorValidator.enableValidation();

buttonOpenPopupNewElement.addEventListener('click', () => {
  addNewElementPopup.open();
  newElementValidator.disableNewCardSubmitButtonStatus();
  newElementValidator.hideError(popupNewElementFormInputTitle);
  newElementValidator.hideError(popupNewElementFormInputUrl);
  popupNewElementForm.reset();
});


//////////////////////////////////////////////////////project 9





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
      const card = initCard(item);
      const cardElement = card.render();
      cardList.addItem(cardElement);
    }
  }, elementContainer);
  cardList.renderItems();
};

const initCard = (item) => {
  const card = new Card(item, userId, CARD_TEMPLATE, {
    handleCardClick: (name, link) => {
      imagePreview.open(name, link);
    },
    handleLikeClick: () => {
      const likedCard = card.initSelfLike();
      const resApi = likedCard ?
        api.delLikes(card.getCardId()) :
        api.setLikes(card.getCardId());
      resApi.then((item) => {
        card.setLikes(item.likes);
        card.renderLikes();
      }).catch((err) => {
        console.log(err);
      });
    },
    handleDeleteClick: () => {
      popupDeleteCardSubmit.open(card);
    },
  });
  return card;
};


const addNewCardHandler = (card) => {
  api.addCard(card.name, card.link).then((item) => {
      const newCard = initCard(item);
      const cardElement = newCard.render();
      elementContainer.prepend(cardElement);
    })
    .then(() => {
      addNewElementPopup.close();
    })
    .catch((err) => {
      console.log(err)
    })
};


const addNewElementPopup = new PopupWithForm(
  ".newElement",
  addNewCardHandler
);
addNewElementPopup.setEventListeners();

const editProfileAvatarHandler = () => {
  api.editUserAvatar(popupAvatarLink.value)
    .then(() => {
      avatarAuthor.src = popupAvatarLink.value;
      editProfileAvatarPopup.close();
    })
    .catch((err) => {
      console.log(err)
    });
}

const cardDeleteHandler = (card) => {
  api.deleteCard(card.getCardId())
    .then(() => {
     card.deleteCard();
      popupDeleteCardSubmit.close();
    })
    .catch((err) => { 
      console.log(err);
    })
}

const popupDeleteCardSubmit = new PopupSubmit(
  '.popup__type_submit', cardDeleteHandler
)
popupDeleteCardSubmit.setEventListeners();




const editProfileAvatarPopup = new PopupWithForm(
  '.popup__type_editAvatar',
  editProfileAvatarHandler);
editProfileAvatarPopup.setEventListeners();

profileEditAvatarBtn.addEventListener('click', () => {
  formPopupEditAvatar.reset()
  avatarEditorValidator.disableNewCardSubmitButtonStatus()
  avatarEditorValidator.hideError(popupAvatarLink);
  editProfileAvatarPopup.open();
})