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
const popupCreateInputName = popupFormCreate.querySelector(
  '.popup-form__input_img-name'
);
const popupCreateInputLink = popupFormCreate.querySelector(
  '.popup-form__input_link'
);
const buttonCloseFormCreate = popupFormCreate.querySelector('.close-button');

const popupCard = document.querySelector('.popup_card');

const popupName = popupCard.querySelector('.popup__name');
const popupImg = popupCard.querySelector('.popup__img');
const templatePlaceItem = document.getElementById(
  'template-place-item'
).content;
const cardsContainer = document.querySelector('.place__list');

const initialPlaceCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    alt: 'Горная река Архыза ранней весной',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    alt: 'Лесное озеро ранней весной',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    alt: 'Панельные дома',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    alt: 'Почва Камчатки',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    alt: 'Железная дорога идет сквозь лес',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    alt: 'Байкал во льду',
  },
];

// common

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.body.classList.add('pages_popup-opened');
  popup.addEventListener('keyup', closePopupKeyEscape);
}

function closePopupKeyEscape(evt) {
  if (evt.key == 'Escape' || evt.key == 'Esc' || evt.keyCode == 27) {
    const popup = document.querySelector('.popup_opened');
    if (popup) closePopup(popup);
  }
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.body.classList.remove('pages_popup-opened');
  popup.removeEventListener('keyup', closePopupKeyEscape);
}

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
  disableButton(
    popupFormCreate,
    '.popup-form__submit-button',
    'popup-form__submit-button_disabled'
  );
});

formCreate.addEventListener('submit', (evt) => {
  evt.preventDefault();
  closePopup(popupFormCreate);
  const card = {
    name: popupCreateInputName.value.trim(),
    link: popupCreateInputLink.value.trim(),
  };

  cardsContainer.prepend(createPlaceCard(card, templatePlaceItem));

  evt.target.reset();
});

// cards

function fillPopupCard(name, src, alt) {
  popupName.textContent = name;
  popupImg.src = src;
  popupImg.alt = alt;
}

function createPlaceCard(card, template) {
  const elementLi = template.querySelector('.place__item').cloneNode(true);

  const img = elementLi.querySelector('.place__img');
  img.src = card.link;
  const alt = card.alt || card.name;
  img.alt = alt;
  elementLi.querySelector('.place__name').textContent = card.name;

  const likeButton = elementLi.querySelector('.place__like-button');
  likeButton.addEventListener('click', (evt) =>
    evt.target.classList.toggle('like-button_active')
  );

  const removeButton = elementLi.querySelector('.place__remove-button');
  removeButton.addEventListener('click', () => elementLi.remove());

  const openPopupButton = elementLi.querySelector('.place__open-popup-button');
  openPopupButton.addEventListener('click', () => {
    fillPopupCard(card.name, card.link, alt);
    openPopup(popupCard);
  });

  return elementLi;
}

const placeCardsPrepared = initialPlaceCards.map((card) =>
  createPlaceCard(card, templatePlaceItem)
);
cardsContainer.append(...placeCardsPrepared);

// Validation

enableValidation({
  formSelector: '.popup__popup-form',
  inputSelector: '.popup-form__input',
  submitButtonSelector: '.popup-form__submit-button',
  inactiveButtonClass: 'popup-form__submit-button_disabled',
  inputErrorClass: 'popup-form__input_error_active',
  errorClass: 'popup-form__input-error_active',
});
