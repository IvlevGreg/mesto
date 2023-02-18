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
  const buttonSubmit = form.querySelector(submitButtonSelector);

    inputList.forEach((input) => {
      input.addEventListener('input', () => {
        toggleInputError(input, input.validationMessage);
        toggleButtonState(
          buttonSubmit,
          inactiveButtonClass,
          inputList
        );
      });
    });
  });

  function toggleInputError(input, errorMessage) {
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
function toggleButtonState(
  buttonSubmit,
  inactiveButtonClass,
  inputList
) {
  const isFormValid = inputList.every(({ validity }) => validity.valid);
  if (isFormValid) {
    enableButton(buttonSubmit, inactiveButtonClass);
  } else {
    disableButton(buttonSubmit, inactiveButtonClass);
  }
}

function disableButton(button, inactiveButtonClass) {
  button.classList.add(inactiveButtonClass);
  button.disabled = true;
}

function enableButton(button, inactiveButtonClass) {
  button.classList.remove(inactiveButtonClass);
  button.disabled = false;
}
