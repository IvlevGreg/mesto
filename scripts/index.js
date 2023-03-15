import { Card } from './components/Card.js';
import { initialPlaceCards } from './utils/cardsArray.js';
import { FormValidator } from './components/FormValidator.js';
import { Section } from './components/Section.js';
import { PopupWithForm } from './components/PopupWithForm.js';
import { PopupWithImage } from './components/PopupWithImage.js';
import { UserInfo } from './components/UserInfo.js';

const buttonEdit = document.querySelector('.profile__edit-button');
const formEdit = document.querySelector('.popup-form_edit');

const buttonCreate = document.querySelector('.profile__add-button');
const formCreate = document.querySelector('.popup-form_create');

const templatePlaceItem = document.getElementById(
  'template-place-item'
).content;

//popup edit

const popupFormEdit = new PopupWithForm('.popup_edit', '.popup__close-button');

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

formEdit.addEventListener('submit', (evt) => {
  evt.preventDefault();
  popupFormEdit.close();
  userInfo.setUserInfo({ ...popupFormEdit.getInputValues() });
});

// popup create

const popupFormCreate = new PopupWithForm(
  '.popup_create',
  '.popup__close-button',
  formCreateCallback
);

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
  popupFormCreate.open();
});

function formCreateCallback(evt) {
  evt.preventDefault();
  formCreateValidator.disableButton();
  const card = {
    ...popupFormCreate.getInputValues(),
  };
  cardRenderer(card);
  popupFormCreate.close();
  evt.target.reset();
}

// cards

const popupWithImage = new PopupWithImage(
  '.popup_card',
  '.popup__close-button'
);

function cardRenderer(card) {
  const cardEl = new Card(
    card,
    templatePlaceItem,
    popupWithImage.open.bind(popupWithImage)
  );
  cardList.addItem(cardEl.createPlaceCard());
}

const cardList = new Section(
  { items: initialPlaceCards, renderer: cardRenderer },
  '.place__list'
);
cardList.renderItems();
