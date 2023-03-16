import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, buttonCloseSelector, submitCallback) {
    super(popupSelector, buttonCloseSelector);
    this._submitCallback = submitCallback;
    this._inputs = this._popup.querySelectorAll('input');
  }

  open() {
    super.open();

    this._getFocusOnFirstInput();
    this._popup.addEventListener('submit', this._submitCallback);
  }

  getInputValues() {
    const obj = {};
    this._inputs.forEach((input) => {
      obj[input.name] = input.value;
    });

    return obj;
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
  }
}
