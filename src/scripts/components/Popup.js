export class Popup {
  constructor(popupSelector, buttonCloseSelector) {
    this._popup = document.querySelector(popupSelector);
    this._buttonClose = this._popup.querySelector(buttonCloseSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key == 'Escape') {
      this.close();
    }
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.body.classList.remove('pages_popup-opened');

    document.removeEventListener('keyup', this._handleEscClose);
  }

  _handleOutsidePopup(evt) {
    if (evt.target === this._popup) {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) =>
      this._handleOutsidePopup(evt)
    );
    this._buttonClose.addEventListener('click', () => this.close());
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.body.classList.add('pages_popup-opened');

    document.addEventListener('keyup', this._handleEscClose);
  }
}
