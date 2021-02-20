import Popup from './Popup.js';

export default class PopupSubmit extends Popup{
  constructor(popupSelector, cardDeleteHandler) {
    super(popupSelector);
    this._cardDeleteHandler = cardDeleteHandler;
    this._popupForm = this._popupSelector.querySelector('.popup__form');
    this._saveBtn = this._popupForm.querySelector('.popup__save-btn');
  }

  open(card) {
    this._card = card;
    super.open();
  }

  setEventListeners() {
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._cardDeleteHandler(this._card);
    });
    super.setEventListener();
  }
}