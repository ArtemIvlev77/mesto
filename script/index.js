
const popupProfileEditor = document.querySelector('.popup__profile-editor');
const popupNewElement = document.querySelector('.popup__new-element');
const popupElementPreview = document.querySelector('.popup__element-preview');

const elementTemplate = document.querySelector('#element__template');
const elementContainer = document.querySelector('.elements');

const buttonOpenPopupProfileEditor = document.querySelector('.profile__edit-btn');
const buttonOpenPopupNewElement = document.querySelector('.profile__add-btn');

const closeButtonPopupProfileEditor = popupProfileEditor.querySelector('.popup__profile-editor_close-btn');
const closeButtonPopupNewElement = popupNewElement.querySelector('.popup__new-element_close-btn');
const closeButtonPopupElementPreview = popupElementPreview.querySelector('.popup__element-preview_close-btn');

const formPopupProfileEdit = popupProfileEditor.querySelector('.popup__profile-editor_form');
const nameInput = document.querySelector('.popup__name-input');
const jobInput = document.querySelector('.popup__job-input');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
nameInput.value = profileName.textContent;
jobInput.value = profileJob.textContent;

const popupNewElementForm = popupNewElement.querySelector('.popup__new-element_form');
const popupNewElementTitle = popupNewElementForm.querySelector('.popup__element-title');
const popupNewElementImage = popupNewElementForm.querySelector('.popup__element-link');
const popupElementPreviewImage = popupElementPreview.querySelector('.popup__image-preview');
const popupElementPreviewTitle = popupElementPreview.querySelector('.popup__title_image-preview');


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


const getElementItem = (elementItem) => {
  const elementCard = elementTemplate.cloneNode(true).content;
  const elementTitle = elementCard.querySelector('.element__title');
  const elementImage = elementCard.querySelector('.element__image');
  const elementRemoveBtn = elementCard.querySelector('.element__remove-btn');
  const elementLikeBtn = elementCard.querySelector('.element__like-btn');
  const elementImageBtn = elementCard.querySelector('.element__image-btn');

  elementImageBtn.addEventListener('click', () => handleElementPreview(elementItem));
  elementRemoveBtn.addEventListener('click', handleRemoveElement);
  elementLikeBtn.addEventListener('click', handleLikeElement);

  elementTitle.textContent = elementItem.name;
  elementImage.src = elementItem.link;
  elementImage.alt = elementItem.name;

  return elementCard;
};

const handleLikeElement = (event) => {
  const likeBtn = event.target.closest('.element__like-btn');
  likeBtn.classList.toggle('element__like_active');
};

const handleRemoveElement = (event) => {
  event.target.closest('.element').remove();
};

const handleElementPreview = (elementItem) => {
  popupElementPreviewImage.src = elementItem.link;
  popupElementPreviewImage.alt = `Изображение ${elementItem.name}`;
  popupElementPreviewTitle.textContent = elementItem.name;
  openPopup(popupElementPreview);
};

initialCards.forEach((data) => {
  const renderElements = getElementItem(data);
  elementContainer.append(renderElements);
});

closePopupEscBtn = (evt) => {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_is-opened');
    if (activePopup.classList.contains('popup__profile-editor')) {
      closePopup(popupProfileEditor);
    } else {
      if (activePopup.classList.contains('popup__new-element')) {
        closePopup(popupNewElement);
      } else {
        if (activePopup.classList.contains('popup__element-preview')) {
          closePopup(popupElementPreview);
        }
      }
    }
  }
}


const openPopup = (popup) => {
  popup.classList.add('popup_is-opened');
  if (popup.classList.contains('popup_is-opened')) {
    document.addEventListener('keydown', closePopupEscBtn);
  }
};

const popupNewElementReset = () => {
  const forms = popupNewElement.querySelector('.popup__form');
  forms.reset();
}

const closePopup = (popup) => {
  popup.classList.remove('popup_is-opened');
  if (popup.classList.contains('popup_is-opened')) {
    document.removeEventListener('keydown', closePopupEscBtn);
    document.removeEventListener('click', closePopupByClickOnOverlay);
  }
}

const handleSubmitProfile = (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfileEditor);
};

const submitNewElementPopupByEnterKey = (evt) => {
  const input = popupNewElement.querySelectorAll('.popup__text');
  if(evt.key === 'Enter') {
    if(input.validity === true) {
      handleSubmitNewElement(evt);
    }
  }
}

const handleSubmitNewElement = (evt) => {
  evt.preventDefault();
  const elementItem = getElementItem({
    name: popupNewElementTitle.value,
    link: popupNewElementImage.value,
    alt: popupNewElementTitle.value
  });
  elementContainer.prepend(elementItem);
  closePopup(popupNewElement);
  popupNewElementTitle.value = '';
  popupNewElementImage.value = '';
};

const closePopupByClickOnOverlay = (evt) => {
const activePopup = document.querySelector('.popup_is-opened');
  if (evt.target === evt.currentTarget) {
    closePopup(activePopup);
  }
}



const bindListeners = () => {
  buttonOpenPopupProfileEditor.addEventListener('click', () => openPopup(popupProfileEditor));
  buttonOpenPopupNewElement.addEventListener('click', () => openPopup(popupNewElement));
  buttonOpenPopupNewElement.addEventListener('click', popupNewElementReset);
  closeButtonPopupNewElement.addEventListener('click', () => closePopup(popupNewElement));
  closeButtonPopupProfileEditor.addEventListener('click', () => closePopup(popupProfileEditor));
  closeButtonPopupElementPreview.addEventListener('click', () => closePopup(popupElementPreview));
  formPopupProfileEdit.addEventListener('submit', handleSubmitProfile);
  popupNewElement.addEventListener('submit', handleSubmitNewElement);
  popupNewElement.addEventListener('keydown', submitNewElementPopupByEnterKey);
  popupNewElement.addEventListener('click', closePopupByClickOnOverlay);
  popupProfileEditor.addEventListener('click', closePopupByClickOnOverlay);
  popupElementPreview.addEventListener('click', closePopupByClickOnOverlay);
};

bindListeners();

