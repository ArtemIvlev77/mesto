const popupProfileEditor = document.querySelector('.popup__profile-editor');
const popupNewElement = document.querySelector('.popup__new-element');
const popupElementPreview = document.querySelector('.popup__element-preview');

const elementTemplate = document.querySelector('#element__template');
const elementContainer = document.querySelector('.elements');

const buttonOpenPopupProfileEditor = document.querySelector('.profile__edit-btn');
const buttonOpenPopupNewElement = document.querySelector('.profile__add-btn');

const closeButton = document.querySelector('.popup__close-btn');
const closeButtonPopupProfileEditor = popupProfileEditor.querySelector('.popup__profile-editor_close-btn');
const closeButtonPopupNewElement = popupNewElement.querySelector('.popup__new-element__close-btn');
const closeButtonPopupElementPreview = popupElementPreview.querySelector('.popup__element-preview_close-btn');

const formPopupProfileEdit = popupProfileEditor.querySelector('.popup__profile-editor__form');
const nameInput = document.querySelector('.popup__name-input');
const jobInput = document.querySelector('.popup__job-input');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
nameInput.value = profileName.textContent;
jobInput.value = profileJob.textContent;

const popupNewElemntForm = popupNewElement.querySelector('.popup__new-element_form');
const popupNewElementTitle = popupNewElemntForm.querySelector('.popup__element-title');
const popupNewElementImage = popupNewElemntForm.querySelector('.popup__element-link');

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
  togglePopup(popupElementPreview);
};

initialCards.forEach((data) => {
  const renderElements = getElementItem(data);
  elementContainer.append(renderElements);
});

const togglePopup = (popup) => {
  popup.classList.toggle('popup_is-opened');
};


const handleSubmitProfile = (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  togglePopup(popupProfileEditor);
};

const handleSubmitNewElement = (evt) => {
  evt.preventDefault();
  const elementItem = getElementItem({
    name: popupNewElementTitle.value,
    link: popupNewElementImage.value,
    alt: popupNewElementTitle.value
  });
  elementContainer.prepend(elementItem);
  togglePopup(popupNewElement);
  popupNewElementTitle.value = '';
  popupNewElementImage.value = '';
};

const bindListeners = () => {
  buttonOpenPopupProfileEditor.addEventListener('click', () => togglePopup(popupProfileEditor));
  buttonOpenPopupNewElement.addEventListener('click', () => togglePopup(popupNewElement));
  closeButton.addEventListener('click', (event) => {
    if (event.target == popupProfileEditor) {
      togglePopup(popupProfileEditor);
    }
  });

  // closeButtonPopupProfileEditor.addEventListener('click', () => togglePopup(popupProfileEditor));
  // closeButtonPopupNewElement.addEventListener('click', () => togglePopup(popupNewElement));
  // closeButtonPopupElementPreview.addEventListener('click', () => togglePopup(popupElementPreview));
  formPopupProfileEdit.addEventListener('submit', handleSubmitProfile);
  popupNewElement.addEventListener('submit', handleSubmitNewElement);
};

bindListeners();