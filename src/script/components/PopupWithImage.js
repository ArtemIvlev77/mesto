import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
  constructor(popupSelector){
    super(popupSelector);
    this._elementImage = this._popupSelector.querySelector('.popup__image-preview');
    this._elementImageTitle = this._popupSelector.querySelector('.popup__title_image-preview')
  }
  open(name, link) {
    this._elementImage.src = link;
    this._elementImage.alt = name;
    this._elementImageTitle.textContent = name;
    super.open();
  };
}