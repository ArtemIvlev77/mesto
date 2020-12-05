import {openPopup, popupElementPreview} from "./index.js";


export class Card {
    constructor(name, link, templateSelector) {
        this._name = name;
        this._link = link;
        this._template = document.querySelector(templateSelector).content.querySelector('.element');
        this._content = null;
    }

    _getTemplate() {
        this._content = this._template.cloneNode(true);
        return this._content;
    }

    _like = () => {
        this._content.querySelector('.element__like-btn').classList.toggle('element__like_active');
    }

    _delete = () => {
        this._content.remove();
    }

    _setEventListeners() {
        this._content.querySelector('.element__remove-btn').addEventListener('click', this._delete);
        this._content.querySelector('.element__like-btn').addEventListener('click', this._like);
        this._content.querySelector('.element__image-btn').addEventListener('click', () => this._handleOpenPopup());
    }

    _handleOpenPopup() {
    popupElementPreview.querySelector('.popup__image-preview').src = this._link;
    document.querySelector('.popup__title_image-preview').textContent =  this._name;
    openPopup(popupElementPreview);
    }

    render() {
        this._getTemplate();
        this._setEventListeners();
        this._content.querySelector('.element__title').textContent = this._name;
        const elementImage = this._content.querySelector('.element__image');
        elementImage.src = this._link;
        elementImage.alt = this._name;
        return this._content;
    }
}