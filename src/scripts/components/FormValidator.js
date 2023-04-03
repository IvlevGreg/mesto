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
    this._inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    this._buttonSubmit = this._form.querySelector(this._submitButtonSelector);
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

  _toggleButtonState() {
    const isFormValid = this._inputList.every(({ validity }) => validity.valid);
    if (isFormValid) {
      this.enableButton();
    } else {
      this.disableButton();
    }
  }

  checkFormValidity() {
    this._toggleButtonState();
    this._inputList.forEach((input) => {
      this._toggleInputError(input, input.validationMessage);
    });
  }

  disableButton() {
    this._buttonSubmit.classList.add(this._inactiveButtonClass);
    this._buttonSubmit.disabled = true;
  }

  enableButton() {
    this._buttonSubmit.classList.remove(this._inactiveButtonClass);
    this._buttonSubmit.disabled = false;
  }

  enableValidation() {
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._toggleInputError(input, input.validationMessage);
        this._toggleButtonState();
      });
    });
  }
}
