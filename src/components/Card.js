export default class Card {
  constructor(data, cardSelector, handleImageClick, handleDeleteButton, handleLikeButton) {
    this._name = data.name;
    this._link = data.link || data.url; // fixed card image not loading
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._isLiked = data.isLiked;
    this._id = data._id;
    this._handleDeleteButton = handleDeleteButton;
    this._handleLikeButton = handleLikeButton;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".el__element")
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      // this._likeButton.classList.toggle("element__like-button_active");
      this._handleLikeButton(this._id);
    });

    this._deleteButton.addEventListener("click", () => {
      // this._element.remove();
      this._handleDeleteButton(this._id, this._element);
    });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });
  }

  isLiked() {
    return this._isLiked;
  }

  removeCard() {
    this._element.remove();
  }

  _renderLikedCards() {
    if (this._isLiked) {
      this._likeButton.classList.add('element__like-button_active');
    } else {
      this._likeButton.classList.remove('element__like-button_active');
    }
  }

  setIsLiked(isLiked) {
    this._isLiked = isLiked;
    this._renderLikedCards();
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".element__text").textContent = this._name;
    this._cardImage = this._element.querySelector(".element__img");
    this._cardTitle = this._element.querySelector('.element__text');
    this._likeButton = this._element.querySelector(".element__like-button");
    this._deleteButton = this._element.querySelector(".element__delete-button");
    
    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    
    this._renderLikedCards();

    this._setEventListeners();

    return this._element;
  }
}