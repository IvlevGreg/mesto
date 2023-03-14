export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  _handleEscClose(evt) {
    if (evt.key == 'Escape') {
      this.closePopup(this._popup);
    }
  }

  //   _getFocusOnFirstInput() {
  //     this._popup.querySelector('input').focus();
  //   }

  open() {
    this._popup.classList.add('popup_opened');
    document.body.classList.add('pages_popup-opened');
    this._popup.addEventListener('keyup', this._handleEscClose);
  }

  close() {
    this.popup.classList.remove('popup_opened');
    document.body.classList.remove('pages_popup-opened');
    this.popup.removeEventListener('keyup', this._handleEscClose);
  }

  setEventListeners() {}
}
