import { disableButton } from './utils.js';

export class FormValidator {
  constructor(
    {
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
      errorClass,
    },
    form
  ) {
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;
    this._form = form;
  }

  _toggleInputError(input, errorMessage) {
    if (!input.validity.valid) {
      this._showInputError(input, errorMessage);
    } else {
      this._hideInputError(input);
    }
  }

  _showInputError(input, errorMessage) {
    const errorText = input.closest('label').querySelector('span');

    input.classList.add(this._inputErrorClass);
    errorText.classList.add(this._errorClass);
    errorText.textContent = errorMessage;
  }

  _hideInputError(input) {
    const errorText = input.closest('label').querySelector('span');

    errorText.classList.remove(this._errorClass);
    input.classList.remove(this._inputErrorClass);
    errorText.textContent = '';
  }

  _toggleButtonState(buttonSubmit, inactiveButtonClass, inputList) {
    const isFormValid = inputList.every(({ validity }) => validity.valid);
    if (isFormValid) {
      this._enableButton(buttonSubmit, inactiveButtonClass);
    } else {
      this._disableButton(buttonSubmit, inactiveButtonClass);
    }
  }

  _disableButton = disableButton;

  _enableButton(button, inactiveButtonClass) {
    button.classList.remove(inactiveButtonClass);
    button.disabled = false;
  }

  enableValidation() {
    const inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    const buttonSubmit = this._form.querySelector(this._submitButtonSelector);

    inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._toggleInputError(input, input.validationMessage);
        this._toggleButtonState(
          buttonSubmit,
          this._inactiveButtonClass,
          inputList
        );
      });
    });
  }
}
