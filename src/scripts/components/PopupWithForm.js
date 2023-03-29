import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, buttonCloseSelector, submitCallback) {
        super(popupSelector, buttonCloseSelector);
        this._submitCallback = submitCallback;
        this._inputs = this._popup.querySelectorAll('input');
        this._form = this._popup.querySelector('form');
    }

    _getFocusOnFirstInput() {
        this._popup.querySelector('input').focus();
    }

    open() {
        super.open();

        this._getFocusOnFirstInput();

    }

    setEventListeners() {
        super.setEventListeners();

        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault()
            this._submitCallback(this._getInputValues())
        });
    }

    _getInputValues() {
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

        this._form.reset();
    }
}
