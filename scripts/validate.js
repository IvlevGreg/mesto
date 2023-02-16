function enableValidation({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
}) {
  const forms = Array.from(document.querySelectorAll(formSelector));

  forms.forEach((form) => {
    const inputList = Array.from(form.querySelectorAll(inputSelector));
    inputList.forEach((input) => {
      input.addEventListener('input', () => {
        isInputValid(input, input.validationMessage);
        isButtonDisabled(
          form,
          submitButtonSelector,
          inactiveButtonClass,
          inputList
        );
      });
    });
  });

  function isInputValid(input, errorMessage) {
    if (!input.validity.valid) {
      showInputError(input, errorMessage);
    } else {
      hideInputError(input);
    }
  }

  function showInputError(input, errorMessage) {
    const errorText = input.closest('label').querySelector('span');

    input.classList.add(inputErrorClass);
    errorText.classList.add(errorClass);
    errorText.textContent = errorMessage;
  }

  function hideInputError(input) {
    const errorText = input.closest('label').querySelector('span');

    errorText.classList.remove(errorClass);
    input.classList.remove(inputErrorClass);
    errorText.textContent = '';
  }
}
function isButtonDisabled(
  form,
  submitButtonSelector,
  inactiveButtonClass,
  inputList
) {
  const isFormValid = inputList.every(({ validity }) => validity.valid);
  if (isFormValid) {
    enableButton(form, submitButtonSelector, inactiveButtonClass);
  } else {
    disableButton(form, submitButtonSelector, inactiveButtonClass);
  }
}

function disableButton(form, submitButtonSelector, inactiveButtonClass) {
  const button = form.querySelector(submitButtonSelector);
  button.classList.add(inactiveButtonClass);
  button.disabled = true;
}

function enableButton(form, submitButtonSelector, inactiveButtonClass) {
  const button = form.querySelector(submitButtonSelector);
  button.classList.remove(inactiveButtonClass);
  button.disabled = false;
}
