import { Card } from './components/Card.js';
import { initialPlaceCards } from './utils/cardsArray.js';
import { openPopup, closePopup } from './utils/utils.js';
import { FormValidator } from './components/FormValidator.js';
import { Section } from './components/Section.js';

const buttonEdit = document.querySelector('.profile__edit-button');
const popupFormEdit = document.querySelector('.popup_edit');
const formEdit = popupFormEdit.querySelector('.popup-form_edit');
const profileDescr = document.querySelector('.profile__descr');
const popupEditInputName = popupFormEdit.querySelector(
  '.popup-form__input_name'
);
const popupEditInputDescr = popupFormEdit.querySelector(
  '.popup-form__input_descr'
);

const buttonsClose = document.querySelectorAll('.popup__close-button');
const popups = document.querySelectorAll('.popup');

const profileTitle = document.querySelector('.profile__title');

const buttonCreate = document.querySelector('.profile__add-button');
const popupFormCreate = document.querySelector('.popup_create');
const formCreate = popupFormCreate.querySelector('.popup-form_create');
const buttonSubmitFormCreate = formCreate.querySelector(
  '.popup-form__submit-button'
);
const popupCreateInputName = popupFormCreate.querySelector(
  '.popup-form__input_img-name'
);
const popupCreateInputLink = popupFormCreate.querySelector(
  '.popup-form__input_link'
);

const templatePlaceItem = document.getElementById(
  'template-place-item'
).content;
const cardsContainer = document.querySelector('.place__list');

// common

function getFocusOnFirstInput(popup) {
  popup.querySelector('input').focus();
}

buttonsClose.forEach((closeButton) => {
  closeButton.addEventListener('click', () => {
    const popup = closeButton.closest('.popup');
    closePopup(popup);
  });
});

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target === popup) {
      closePopup(popup);
    }
  });
});

//popup edit
const formEditValidator = new FormValidator(
  {
    inputSelector: '.popup-form__input',
    submitButtonSelector: '.popup-form__submit-button',
    inactiveButtonClass: 'popup-form__submit-button_disabled',
    inputErrorClass: 'popup-form__input_error_active',
    errorClass: 'popup-form__input-error_active',
  },
  formEdit
);
formEditValidator.enableValidation();

function fillPopupEditForm() {
  popupEditInputName.value = profileTitle.textContent.trim();
  popupEditInputDescr.value = profileDescr.textContent.trim();
}

function changeProfileValues() {
  profileTitle.textContent = popupEditInputName.value.trim();
  profileDescr.textContent = popupEditInputDescr.value.trim();
}

buttonEdit.addEventListener('click', () => {
  fillPopupEditForm();
  formEditValidator.checkFormValidity();
  openPopup(popupFormEdit);
  getFocusOnFirstInput(popupFormEdit);
});

formEdit.addEventListener('submit', (evt) => {
  evt.preventDefault();
  closePopup(popupFormEdit);
  changeProfileValues();
});

// popup create

const formCreateValidator = new FormValidator(
  {
    inputSelector: '.popup-form__input',
    submitButtonSelector: '.popup-form__submit-button',
    inactiveButtonClass: 'popup-form__submit-button_disabled',
    inputErrorClass: 'popup-form__input_error_active',
    errorClass: 'popup-form__input-error_active',
  },
  formCreate
);
formCreateValidator.enableValidation();

buttonCreate.addEventListener('click', () => {
  openPopup(popupFormCreate);
  getFocusOnFirstInput(popupFormCreate);
});

formCreate.addEventListener('submit', (evt) => {
  evt.preventDefault();
  formCreateValidator.disableButton();
  console.dir(formCreate);
  const card = {
    name: popupCreateInputName.value.trim(),
    link: popupCreateInputLink.value.trim(),
  };

  cardRenderer(card);

  closePopup(popupFormCreate);
  evt.target.reset();
});

// cards

function cardRenderer(card) {
  const cardEl = new Card(card, templatePlaceItem);
  cardList.addItem(cardEl.createPlaceCard());
}

const cardList = new Section(
  { items: initialPlaceCards, renderer: cardRenderer },
  '.place__list'
);
cardList.renderItems();
