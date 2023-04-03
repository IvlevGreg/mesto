export class Card {
  constructor(
    data,
    selectorTemplate,
    handleCardClick,
    { putLike, deleteLike, removeCard: removeCardApi },
    userId
  ) {
    const { name, link, alt = name, likes, _id } = data;
    this._name = name;
    this._link = link;
    this._alt = alt;
    this._handleCardClick = handleCardClick;
    this._likes = likes;
    this._id = _id;
    this._putLike = putLike;
    this._deleteLike = deleteLike;

    console.log(this._putLike);

    this._template = document.getElementById(selectorTemplate).content;

    this._liElement = this._template
      .querySelector('.place__item')
      .cloneNode(true);
    this._imgElement = this._liElement.querySelector('.place__img');
    this._openPopupButtonElement = this._liElement.querySelector(
      '.place__open-popup-button'
    );
    this._likeButtonElement = this._liElement.querySelector(
      '.place__like-button'
    );
    this._likeAmountElement = this._liElement.querySelector(
      '.place__like-amount'
    );
    this._removeButtonElement = this._liElement.querySelector(
      '.place__remove-button'
    );
  }
  _toggleButtonClassActive() {
    this._likeButtonElement.classList.toggle('like-button_active');
  }

  _removeCard() {
    this._removeCardApi(this._id).then(() => {
      this._liElement.remove();
      this._liElementent = null;
    });
  }

  _setLikesAmount(num) {
    this._likeAmountElement.textContent = num;
  }

  _addLike() {
    this._putLike(this._id).then(({ likes }) =>
      this._setLikesAmount(likes.length)
    );
  }

  _removeLike() {
    this._deleteLike(this._id).then(({ likes }) =>
      this._setLikesAmount(likes.length)
    );
  }

  _setEventListener() {
    this._likeButtonElement.addEventListener('click', () => {
      this._toggleButtonClassActive();
      this._addLike();
    });

    this._removeButtonElement.addEventListener('click', () =>
      this._removeCard()
    );

    this._openPopupButtonElement.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link, this._alt);
    });
  }

  createPlaceCard() {
    this._imgElement.src = this._link;
    this._imgElement.alt = this._alt;
    this._liElement.querySelector('.place__name').textContent = this._name;
    this._setLikesAmount(this._likes.length);

    this._setEventListener();
    return this._liElement;
  }
}
