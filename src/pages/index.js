import './index.css';

import { Card } from '../scripts/components/Card.js';
import { initialPlaceCards } from '../scripts/utils/cardsArray.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import { Section } from '../scripts/components/Section.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { UserInfo } from '../scripts/components/UserInfo.js';

const buttonEdit = document.querySelector('.profile__edit-button');
const formEdit = document.querySelector('.popup-form_edit');

const buttonCreate = document.querySelector('.profile__add-button');
const formCreate = document.querySelector('.popup-form_create');

const templatePlaceItem = 'template-place-item';

//popup edit

const popupFormEdit = new PopupWithForm('.popup_edit', '.popup__close-button');
popupFormEdit.setEventListeners()

const userInfo = new UserInfo('.profile__title', '.profile__descr');

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

buttonEdit.addEventListener('click', () => {
  popupFormEdit.setInputValues({ ...userInfo.getUserInfo() });
  popupFormEdit.open();
});

// popup create

const popupFormCreate = new PopupWithForm(
  '.popup_create',
  '.popup__close-button',
  formCreateCallback
);
popupFormCreate.setEventListeners()

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
  formCreateValidator.disableButton()
  popupFormCreate.open();
});

function formCreateCallback(data) {
  formCreateValidator.disableButton();
  const card = {
    ...data,
  };
  rendererCard(card);
  popupFormCreate.close();
}

// cards

const popupWithImage = new PopupWithImage(
  '.popup_card',
  '.popup__close-button'
);
popupWithImage.setEventListeners()

function createCard(card) {
  const cardEl = new Card(
    card,
    templatePlaceItem,
    popupWithImage.open.bind(popupWithImage)
  );
  return cardEl.createPlaceCard()
}
function rendererCard(card) {
  cardList.addItem(createCard(card));
}

const cardList = new Section(
  { items: initialPlaceCards, renderer: rendererCard },
  '.place__list'
);
cardList.renderItems();
