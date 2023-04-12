import { Popup } from './Popup.js';

export class PopupWIthConfirm extends Popup {
  constructor(popupSelector, buttonCloseSelector) {
    super(popupSelector, buttonCloseSelector);
    this._inputs = this._popup.querySelectorAll('input') || [];
    this._form = this._popup.querySelector('form');

    this._btnSubmitElement = this._popup.querySelector('button[type="submit"]');
    this._btnSubmitText = this._btnSubmitElement.textContent;
  }

  setSubmitAction(action) {
    this._handleSubmitEvent = action;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitEvent();
    });
  }

  _changeBtnSubmitText(text) {
    this._btnSubmitElement.textContent = text;
  }

  setStatus(status) {
    switch (status) {
      case 'loading':
        this._changeBtnSubmitText('Сохранение...');
        break;
      case 'success':
        this._changeBtnSubmitText(this._btnSubmitText);
        break;
      case 'error':
        this._changeBtnSubmitText('Попробуйте еще раз');
      default:
        break;
    }
  }
}
