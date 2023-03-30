import './index.css';

import { Card } from '../scripts/components/Card.js';
import { initialPlaceCards } from '../scripts/utils/cardsArray.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import { Section } from '../scripts/components/Section.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { UserInfo } from '../scripts/components/UserInfo.js';
import { Api } from '../scripts/components/Api';

const buttonEdit = document.querySelector('.profile__edit-button');
const formEdit = document.querySelector('.popup-form_edit');

const buttonCreate = document.querySelector('.profile__add-button');
const formCreate = document.querySelector('.popup-form_create');

const templatePlaceItem = 'template-place-item';

//popup edit

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-63',
  headers: {
    authorization: '7a43c762-4e63-438c-856b-e056a5084ee3',
    'Content-Type': 'application/json',
  },
});

const popupFormEdit = new PopupWithForm('.popup_edit', '.popup__close-button');
popupFormEdit.setEventListeners();

const main = document.querySelector('.profile');

api.getUserdata().then((data) => {
  main.prepend(new UserInfo(data, 'template-profile').createUser());
});
const userInfo = document.querySelector('.profile');

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

// buttonEdit.addEventListener('click', () => {
//   popupFormEdit.setInputValues({ ...userInfo.getUserInfo() });
//   popupFormEdit.open();
// });

// popup create

const popupFormCreate = new PopupWithForm(
  '.popup_create',
  '.popup__close-button',
  formCreateCallback
);
popupFormCreate.setEventListeners();

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
  formCreateValidator.disableButton();
  popupFormCreate.open();
});

function formCreateCallback(data) {
  formCreateValidator.disableButton();
  const card = {
    ...data,
  };
  console.log(data);
  api.postNewCard(card);
  popupFormCreate.close();
}

// cards

const popupWithImage = new PopupWithImage(
  '.popup_card',
  '.popup__close-button'
);
popupWithImage.setEventListeners();

function createCard(card) {
  const cardEl = new Card(
    card,
    templatePlaceItem,
    popupWithImage.open.bind(popupWithImage),
    api
  );
  return cardEl.createPlaceCard();
}

api.getInitialCards().then((res) => {
  const cardList = new Section(
    { items: res, renderer: rendererCard },
    '.place__list'
  );
  cardList.renderItems();
  function rendererCard(card) {
    cardList.addItem(createCard(card));
  }
});
