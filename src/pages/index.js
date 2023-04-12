import './index.css';

import { Card } from '../scripts/components/Card.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import { Section } from '../scripts/components/Section.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { UserInfo } from '../scripts/components/UserInfo.js';
import { Api } from '../scripts/components/Api';
import { PopupWIthConfirm } from '../scripts/components/PopupWIthConfirm';

const buttonCreate = document.querySelector('.profile__add-button');
const templatePlaceItem = 'template-place-item';
const profileContainer = document.querySelector('.main');
const formValidatorSelectorsProps = {
  inputSelector: '.popup-form__input',
  submitButtonSelector: '.popup-form__submit-button',
  inactiveButtonClass: 'popup-form__submit-button_disabled',
  inputErrorClass: 'popup-form__input_error_active',
  errorClass: 'popup-form__input-error_active',
};

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

const popupFormCardRemove = new PopupWIthConfirm(
  '.popup_card-remove',
  '.popup__close-button'
  // handleCardRemoveCallback
);
popupFormCardRemove.setEventListeners();

// function handleCardRemoveCallback() {
//   popupFormCardRemove.close();
//   removeCard();
//   console.log('test');
// }

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

function rendererCard(card, id) {
  cardList.addItem(createCard(card, id));
}

function removeCard(card) {
  popupFormCardRemove.open.call(popupFormCardRemove);

  popupFormCardRemove.setSubmitAction(() => {
    return api
      .removeCard(card._cardId)
      .then(() => {
        card.removeCard();
        popupFormCardRemove.close();
        popupFormCardRemove.setStatus('success');
      })
      .catch((error) => {
        popupFormCardRemove.setStatus('error');
        throw new Error(error);
      });
  });
}

const cardList = new Section({ renderer: rendererCard }, '.place__list');

//popup edit

const formEditValidator = new FormValidator(
  formValidatorSelectorsProps,
  '.popup-form_edit'
);
formEditValidator.enableValidation();

api
  .getUserdata()
  .then((data) => {
    const popupFormImgEdit = new PopupWithForm(
      '.popup_profile-img-edit',
      '.popup__close-button',
      formEditImgCallback
    );
    popupFormImgEdit.setEventListeners();

    function formEditImgCallback() {
      return api
        .updateUserImg({ ...popupFormImgEdit.getInputValues() })
        .then((res) => {
          userInfo.setUserImg(res);
        })
        .catch((error) => {
          throw new Error(error);
        });
    }

    const formEditImgValidator = new FormValidator(
      formValidatorSelectorsProps,
      '.popup_profile-img-edit'
    );
    formEditImgValidator.enableValidation();

    const userInfo = new UserInfo(data, 'template-profile', {
      handleImgCallback,
      handleProfileEditCallback,
      handleAddButtonCallback,
    });
    profileContainer.prepend(userInfo.createUser());

    function handleProfileEditCallback() {
      popupFormEdit.setInputValues({ ...userInfo.getUserInfo() });
      popupFormEdit.open();
    }

    function handleAddButtonCallback() {
      formCreateValidator.disableButton();
      popupFormCreate.open();
    }

    function handleImgCallback() {
      formEditImgValidator.disableButton();
      popupFormImgEdit.open();
    }

    const popupFormEdit = new PopupWithForm(
      '.popup_edit',
      '.popup__close-button',
      handleFormEdit
    );
    popupFormEdit.setEventListeners();

    function handleFormEdit() {
      return api
        .updateUserData({ ...popupFormEdit.getInputValues() })
        .then((res) => {
          userInfo.setUserInfo(res);
        })
        .catch((error) => {
          throw new Error(error);
        });
    }

    // create cards

    api
      .getInitialCards()
      .then((res) => {
        cardList.renderItems(res, data._id);
      })
      .catch((error) => {
        console.log(error);
      });

    function handleFormCreate() {
      formCreateValidator.disableButton();
      const { ...card } = popupFormCreate.getInputValues();

      return api
        .postNewCard(card)
        .then((card) => {
          cardList.addItem(createCard(card, data._id), false);
        })
        .catch((error) => {
          throw new Error(error);
        })
        .finally(() => {
          formCreateValidator.enableButton();
        });
    }

    const popupFormCreate = new PopupWithForm(
      '.popup_create',
      '.popup__close-button',
      handleFormCreate
    );
    popupFormCreate.setEventListeners();
  })
  .catch((error) => {
    console.log(error);
  });

// popup create

const formCreateValidator = new FormValidator(
  formValidatorSelectorsProps,
  '.popup-form_create'
);
formCreateValidator.enableValidation();
