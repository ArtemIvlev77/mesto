export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
    this._handleClickOverlay = this._handleClickOverlay.bind(this);
    this._handleCloseEsc = this._handleCloseEsc.bind(this);
    this.close = this.close.bind(this);
    this._popupForm = this._popupSelector.querySelector(".popup__form");
  }

  open() {
    this._popupSelector.classList.add('popup_is-opened');
    document.addEventListener('click',  this._handleClickOverlay);
    document.addEventListener('keydown',  this._handleCloseEsc);
  }

  close() {
    if (this._popupForm !== null) {
      this._popupForm.reset()
    };
    this._popupSelector.classList.remove('popup_is-opened');
    document.removeEventListener('click', this._handleClickOverlay);
    document.removeEventListener('keydown', this._handleCloseEsc);
  }

  _handleCloseEsc(evt) {
    if (evt.key ==='Escape') {
      this.close();
    }
  }

  _handleClickOverlay(evt) {
    if (evt.target !== this._popupSelector) {
      return;
    }
    this.close();
  }

  setEventListener() {
    this._popupSelector.querySelector('.popup__closeBtn')
        .addEventListener('click', this.close);
  }

}