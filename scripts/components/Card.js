export class Card {
  constructor(data, selectorTemplate, handleCardClick) {
    const { name, link, alt = name } = data;
    this._name = name;
    this._link = link;
    this._alt = alt;
    this._selectorTemplate = selectorTemplate;
    this._handleCardClick = handleCardClick;

    this._liElement = this._selectorTemplate
      .querySelector('.place__item')
      .cloneNode(true);
    this._imgElement = this._liElement.querySelector('.place__img');
    this._openPopupButtonElement = this._liElement.querySelector(
      '.place__open-popup-button'
    );
    this._likeButtonElement = this._liElement.querySelector(
      '.place__like-button'
    );
    this._removeButtonElement = this._liElement.querySelector(
      '.place__remove-button'
    );
  }
  _toggleButtonClassActive(evt) {
    evt.target.classList.toggle('like-button_active');
  }

  _removeCard() {
    this._liElement.remove();
    this._liElementent = null;
  }

  _setEventListener() {
    this._likeButtonElement.addEventListener(
      'click',
      this._toggleButtonClassActive
    );

    this._removeButtonElement.addEventListener(
      'click',
      this._removeCard.bind(this)
    );

    this._openPopupButtonElement.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link, this._alt);
    });
  }

  createPlaceCard() {
    this._imgElement.src = this._link;
    this._imgElement.alt = this._alt;
    this._liElement.querySelector('.place__name').textContent = this._name;

    this._setEventListener();
    return this._liElement;
  }
}
