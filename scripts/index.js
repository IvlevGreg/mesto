import { Card } from './Card.js';
import { initialPlaceCards } from './cardsArray.js';
import {
  openPopup,
  closePopup,
  fillPopupCard,
  popupCard,
  disableButton,
} from './utils.js';
import { FormValidator } from './FormValidator.js';

const buttonEdit = document.querySelector('.profile__edit-button');
const popupFormEdit = document.querySelector('.popup_edit');
const fromEdit = popupFormEdit.querySelector('.popup-form_edit');
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
const buttonCloseFormCreate = popupFormCreate.querySelector('.close-button');

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
  openPopup(popupFormEdit);
  getFocusOnFirstInput(popupFormEdit);
});

fromEdit.addEventListener('submit', (evt) => {
  evt.preventDefault();
  closePopup(popupFormEdit);
  changeProfileValues();
});

// popup create

buttonCreate.addEventListener('click', () => {
  openPopup(popupFormCreate);
  getFocusOnFirstInput(popupFormCreate);
});

formCreate.addEventListener('submit', (evt) => {
  evt.preventDefault();
  disableButton(buttonSubmitFormCreate, 'popup-form__submit-button_disabled');
  closePopup(popupFormCreate);
  const card = {
    name: popupCreateInputName.value.trim(),
    link: popupCreateInputLink.value.trim(),
  };

  cardsContainer.prepend(createPlaceCard(card, templatePlaceItem));

  evt.target.reset();
});

// cards

function toggleButtonClassActive(evt) {
  evt.target.classList.toggle('like-button_active');
}

function createPlaceCard(card, template) {
  const elementLi = template.querySelector('.place__item').cloneNode(true);

  const img = elementLi.querySelector('.place__img');
  img.src = card.link;
  img.alt = card.name;
  elementLi.querySelector('.place__name').textContent = card.name;

  const likeButton = elementLi.querySelector('.place__like-button');
  likeButton.addEventListener('click', toggleButtonClassActive);

  const removeButton = elementLi.querySelector('.place__remove-button');
  removeButton.addEventListener('click', () => elementLi.remove());

  const openPopupButton = elementLi.querySelector('.place__open-popup-button');
  openPopupButton.addEventListener('click', () => {
    fillPopupCard(card.name, card.link, img.alt);
    openPopup(popupCard);
  });

  return elementLi;
}

const placeCardsPrepared = initialPlaceCards.map((card) => {
  const cardEl = new Card(card, templatePlaceItem);

  return cardEl.createPlaceCard();
});
cardsContainer.append(...placeCardsPrepared);

const forms = Array.from(document.querySelectorAll('.popup__popup-form'));
forms.forEach((form) => {
  const formValidator = new FormValidator(
    {
      inputSelector: '.popup-form__input',
      submitButtonSelector: '.popup-form__submit-button',
      inactiveButtonClass: 'popup-form__submit-button_disabled',
      inputErrorClass: 'popup-form__input_error_active',
      errorClass: 'popup-form__input-error_active',
    },
    form
  );

  formValidator.enableValidation();
});
