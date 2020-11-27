export class Card {
    constructor(name, link, templateSelector, handleElementPreview) {
        this._name = name;
        this._link = link;
        this._template = document.querySelector(templateSelector).content.querySelector('.element');
        this._preview = handleElementPreview;
        this._content = null;
    }

    _like = () => {
        this._content.querySelector('.element__like-btn').classList.toggle('element__like_active');
    }

    _delete = () => {
        this._content.remove();
    }

    _previewImage() {
        this._preview(this._name, this._link)
    }

    render() {
        this._content = this._template.cloneNode(true);
        this._content.querySelector('.element__title').textContent = this._name;
        this._content.querySelector('.element__image').src = this._link;
        this._content.querySelector('.element__image').alt = this._name;
        this._content.querySelector('.element__remove-btn').addEventListener('click', this._delete);
        this._content.querySelector('.element__like-btn').addEventListener('click', this._like);
        this._content.querySelector('.element__image-btn').addEventListener('click', () => this._previewImage());
        return this._content;
    }
}