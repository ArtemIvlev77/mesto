export default class Card {
     constructor(data, userId, templateSelector, {
         handleCardClick,
         handleLikeClick,
         handleDeleteClick
     }) {
         this._name = data.name;
         this._link = data.link;
         this._cardId = data._id;
         this._cardLikes = data.likes;
         this._ownerId = data.owner._id;
         this._handleCardClick = handleCardClick;
         this._handleLikeClick = handleLikeClick;
         this._handleDeleteClick = handleDeleteClick;
         this._template = templateSelector;
         this._content = null;
         this._userId = userId;
     }

     _getTemplate() {
         return this._template.content.querySelector('.element').cloneNode(true);
     }

     _setEventListeners() {
         this._removeBtn.addEventListener('click', this._handleDeleteClick);
         this._likeBtn.addEventListener('click', this._handleLikeClick);
         this._elementImage
             .addEventListener('click', () => this._handleCardClick(this._name, this._link));
     }


     render() {
         this._content = this._getTemplate();
         this._content.querySelector('.element__title').textContent = this._name;
         this._elementImage = this._content.querySelector('.element__image');
         this._likeBtn = this._content.querySelector('.element__like-btn')
         this._removeBtn = this._content.querySelector('.element__remove-btn');
         if (this._ownerId !== this._userId) {
             this._removeBtn.remove();
         };
         this._countLikes = this._content.querySelector('.element__like-count');
         this.renderLikes();
         this._elementImage.src = this._link;
         this._elementImage.alt = this._name;
         this._setEventListeners();
         return this._content
     }


     renderLikes() {
         this._countLikes.textContent = this._cardLikes.length;
         this.toggleLikes(this._userId);
     }

     initSelfLike() {
         return this._cardLikes.some((like) => {
             return like._id === this._userId
         });
     }

     setLikes(likeList) {
         this._cardLikes = likeList;
     }

     getCardId() {
         return this._cardId;
     }

     toggleLikes() {
         if (this.initSelfLike(this._userId)) {
             this._likeBtn.classList.add('element__like-btn_active');
         } else {
             this._likeBtn.classList.remove('element__like-btn_active');
         }
     }

     deleteCard() {
         this._content.remove();
     }

 }