export class Popup {
  constructor(popupSelector, buttonCloseSelector) {
    this._popup = document.querySelector(popupSelector);
    this._buttonClose = this._popup.querySelector(buttonCloseSelector);
  }

  _handleEscClose(evt) {
    if (evt.key == 'Escape') {
      this.closePopup(this._popup);
    }
  }

  _handleOutsidePopup(evt) {
    if (evt.target === this._popup) {
      this.close();
    }
  }

  _getFocusOnFirstInput() {
    this._popup.querySelector('input').focus();
  }

  open() {
    console.log(this._popup);
    this._popup.classList.add('popup_opened');
    document.body.classList.add('pages_popup-opened');

    this._popup.addEventListener('keyup', this._handleEscClose.bind(this));
    this._popup.addEventListener(
      'mousedown',
      this._handleOutsidePopup.bind(this)
    );
    this._buttonClose.addEventListener('click', this.close.bind(this));
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.body.classList.remove('pages_popup-opened');

    this._popup.removeEventListener('keyup', this._handleEscClose);
    this._popup.removeEventListener('mousedown', this._handleOutsidePopup);
    this._buttonClose.removeEventListener('click', this.close);
  }

  // setEventListeners() {}
}
