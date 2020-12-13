export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
  }

  open() {
    this._popupSelector.classList.add('popup_is-opened');
    document.addEventListener('click',  this._handleClickOverlay.bind(this));
    document.addEventListener('keydown',  this._handleCloseEsc.bind(this));
  }

  close() {
    this._popupSelector.classList.remove('popup_is-opened');
    document.removeEventListener('click', () =>  this._handleClickOverlay.bind(this));
    document.removeEventListener('keydown', () =>  this._handleCloseEsc.bind(this));
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
        .addEventListener('click', this.close.bind(this));
  }

}