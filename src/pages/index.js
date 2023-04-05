import './index.css';

import { Card } from '../scripts/components/Card.js';
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

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-63',
  headers: {
    authorization: '7a43c762-4e63-438c-856b-e056a5084ee3',
    'Content-Type': 'application/json',
  },
});

// cards

const popupWithImage = new PopupWithImage(
  '.popup_card',
  '.popup__close-button'
);
popupWithImage.setEventListeners();

const popupFormCardRemove = new PopupWithForm(
  '.popup_card-remove',
  '.popup__close-button',
  formCardRemoveCallback
);
popupFormCardRemove.setEventListeners();

function formCardRemoveCallback() {
  popupFormCardRemove.close();
}

function createCard(card, userId) {
  const cardEl = new Card(
    card,
    templatePlaceItem,
    {
      handleCardClick: popupWithImage.open.bind(popupWithImage),
      handleRemovePopup: removeCard,
    },
    api,
    userId
  );

  return cardEl.createPlaceCard();
}

function removeCard(callback) {
  popupFormCardRemove.open.call(popupFormCardRemove);
  popupFormCardRemove._popup.addEventListener('submit', callback);
}

function rendererCard(card, id) {
  cardList.addItem(createCard(card, id));
}

const cardList = new Section({ renderer: rendererCard }, '.place__list');

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

const profileContainer = document.querySelector('.profile');

api.getUserdata().then((data) => {
  const userInfo = new UserInfo(data, 'template-profile');
  profileContainer.prepend(userInfo.createUser());

  buttonEdit.addEventListener('click', () => {
    popupFormEdit.setInputValues({ ...userInfo.getUserInfo() });
    popupFormEdit.open();
  });

  const popupFormEdit = new PopupWithForm(
    '.popup_edit',
    '.popup__close-button',
    formEditCallback
  );

  function formEditCallback() {
    popupFormEdit.setStatus('isLoading');
    api
      .updateUserData({ ...popupFormEdit.getInputValues() })
      .then((res) => {
        userInfo.setUserInfo(res);
        popupFormEdit.close();
        popupFormEdit.setStatus('success');
      })
      .catch((error) => {
        popupFormCreate.setStatus('error');
        throw new Error(error);
      });
  }

  popupFormEdit.setEventListeners();

  // create cards

  api.getInitialCards().then((res) => {
    cardList.renderItems(res, data._id);
  });

  function formCreateCallback() {
    console.log(data._id);
    formCreateValidator.disableButton();
    popupFormCreate.setStatus('isLoading');
    const { ...card } = popupFormCreate.getInputValues();

    api
      .postNewCard(card)
      .then((card) => {
        cardList.addItem(createCard(card, data._id), false);
        popupFormCreate.close();
        popupFormCreate.setStatus('success');
      })
      .catch((error) => {
        popupFormCreate.setStatus('error');
        throw new Error(error);
      })
      .finally(() => {
        formCreateValidator.enableButton();
      });
  }

  const popupFormCreate = new PopupWithForm(
    '.popup_create',
    '.popup__close-button',
    formCreateCallback
  );
  popupFormCreate.setEventListeners();

  buttonCreate.addEventListener('click', () => {
    formCreateValidator.disableButton();
    popupFormCreate.open();
  });
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
