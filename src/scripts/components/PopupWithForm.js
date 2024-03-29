import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, buttonCloseSelector, submitCallback) {
    super(popupSelector, buttonCloseSelector);
    this._submitCallback = submitCallback;
    this._inputs = this._popup.querySelectorAll('input') || [];
    this._form = this._popup.querySelector('form');

    this._btnSubmitElement = this._popup.querySelector('button[type="submit"]');
    this._btnSubmitText = this._btnSubmitElement.textContent;
  }

  _getFocusOnFirstInput() {
    if (this._popup.querySelector('input')) {
      this._popup.querySelector('input').focus();
    }
  }

  open() {
    super.open();

    this._getFocusOnFirstInput();
  }

  setEventListeners() {
    super.setEventListeners();

    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.setStatus('loading');
      this._submitCallback()
        .then(() => {
          this.close();
          this.setStatus('success');
        })
        .catch((error) => {
          this.setStatus('error');
        });
    });
  }

  getInputValues() {
    const obj = {};
    this._inputs.forEach((input) => {
      obj[input.name] = input.value;
    });

    return obj;
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

  setInputValues(obj) {
    this._inputs.forEach((input) => {
      if (obj[input.name]) {
        input.value = obj[input.name].trim();
      }
    });

    return obj;
  }

  close() {
    super.close();

    this._form.reset();
  }
}
