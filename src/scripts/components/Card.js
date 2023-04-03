export class Card {
  constructor(
    data,
    selectorTemplate,
    handleCardClick,
    { putLike, deleteLike, removeCard: removeCardApi },
    userId
  ) {
    this._handleCardClick = handleCardClick;
    this._userId = userId;

    // data
    const {
      name,
      link,
      alt = name,
      likes,
      _id,
      owner: { _id: authorId },
    } = data;

    this._name = name;
    this._link = link;
    this._alt = alt;
    this._likes = likes;
    this._id = _id;
    this._authorId = authorId;

    //api
    this._putLike = putLike;
    this._deleteLike = deleteLike;

    //template
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
  _toggleButtonClassActive(bollean) {
    this._likeButtonElement.classList.toggle('like-button_active', bollean);
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

  _setLikes(likes) {
    this._setLikesAmount(likes.length);
    this._likes = likes;
  }

  _addLike() {
    this._setLikesAmount('...');
    this._putLike(this._id)
      .then(({ likes }) => {
        this._setLikes(likes);
      })
      .catch(() => this._setLikesAmount('Упс...'));
  }

  _removeLike() {
    this._deleteLike(this._id).then(({ likes }) => {
      this._setLikes(likes);
    });
  }

  _isUserLike() {
    return this._likes.findIndex(({ _id }) => this._userId === _id) > -1;
  }

  }

  _setEventListener() {
    this._likeButtonElement.addEventListener('click', () => {
      this._toggleButtonClassActive();
      this._isUserLike() ? this._removeLike() : this._addLike();
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
    this._toggleButtonClassActive(this._isUserLike());


    this._setEventListener();
    return this._liElement;
  }
}
