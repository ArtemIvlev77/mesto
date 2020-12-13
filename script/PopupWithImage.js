import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
  open(name, link) {
    this._elementImage = this._popupSelector.querySelector('.popup__image-preview')
    this._elementImage.src = link;
    this._elementImage.alt = name;
    this._popupSelector.querySelector('.popup__title_image-preview').textContent = name;
    super.open();
  };
}