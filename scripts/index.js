const editButton = document.querySelector('.profile__edit-button');
const popupFormEdit = document.querySelector('.popup_edit');
const editForm = popupFormEdit.querySelector('.popup-form_edit');
const profileDescr = document.querySelector('.profile__descr');
const popupEditInputName = popupFormEdit.querySelector(
  '.popup-form__input_name'
);
const popupEditInputDescr = popupFormEdit.querySelector(
  '.popup-form__input_descr'
);

const closeButtons = document.querySelectorAll('.popup__close-button');
const popups = document.querySelectorAll('.popup');

const profileTitle = document.querySelector('.profile__title');

const createButton = document.querySelector('.profile__add-button');
const popupFormCreate = document.querySelector('.popup_create');
const createForm = popupFormCreate.querySelector('.popup-form_create');
const popupCreateInputName = popupFormCreate.querySelector(
  '.popup-form__input_img-name'
);
const popupCreateInputLink = popupFormCreate.querySelector(
  '.popup-form__input_link'
);
const closeButtonFormCreate = popupFormCreate.querySelector('.close-button');

const popupCard = document.querySelector('.popup_card');

const popupName = popupCard.querySelector('.popup__name');
const popupImg = popupCard.querySelector('.popup__img');
const templatePlaceItem = document.getElementById(
  'template-place-item'
).content;
const placeList = document.querySelector('.place__list');

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
  if (popup.querySelector('input')) {
    popup.querySelector('input').focus();
  }
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.body.classList.remove('pages_popup-opened');
}

closeButtons.forEach((closeButton) => {
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

editButton.addEventListener('click', () => {
  fillPopupEditForm();
  openPopup(popupFormEdit);
});

editForm.addEventListener('submit', (e) => {
  e.preventDefault();
  closePopup(popupFormEdit);
  changeProfileValues();
});

// popup create

function clearPopupCreateForm() {
  popupCreateInputName.value = '';
  popupCreateInputLink.value = '';
}

createButton.addEventListener('click', () => {
  fillPopupEditForm();
  openPopup(popupFormCreate);
});

closeButtonFormCreate.addEventListener('click', () => {
  closePopup(popupFormCreate);
});

createForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  closePopup(popupFormCreate);
  const card = {
    name: popupCreateInputName.value.trim(),
    link: popupCreateInputLink.value.trim(),
  };

  placeList.prepend(createPlaceCard(card, templatePlaceItem));
  clearPopupCreateForm();
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

initialPlaceCards.forEach((card) => {
  placeList.append(createPlaceCard(card, templatePlaceItem));
});
