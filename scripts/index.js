const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = popup.querySelector('.close-button');
const editForm = popup.querySelector('.edit-form');
const profileDescr = document.querySelector('.profile__descr');
const popupInputName = popup.querySelector('.edit-form__input_name');
const popupInputDescr = popup.querySelector('.edit-form__input_descr');
const profileTitle = document.querySelector('.profile__title');
const templatePlaceItem = document.getElementById(
  'template-place-item'
).content;
const placeList = document.querySelector('.place__list');

const initialPlaceCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

function createPlaceCard(card, template, parent) {
  const elementLi = template.querySelector('.place__item').cloneNode(true);

  elementLi.querySelector('.place__img').src = card.link;
  elementLi.querySelector('.place__name').textContent = card.name;

  parent.append(elementLi);
}

initialPlaceCards.forEach((card) => {
  createPlaceCard(card, templatePlaceItem, placeList);
});

function openPopup() {
  popup.classList.add('popup_opened');
  document.body.classList.add('pages_popup-opened');
  popup.querySelector('input').focus();
}

function closePopup() {
  popup.classList.remove('popup_opened');
  document.body.classList.remove('pages_popup-opened');
}

function fillPopup() {
  popupInputName.value = profileTitle.textContent.trim();
  popupInputDescr.value = profileDescr.textContent.trim();
}

function changeProfileValues() {
  profileTitle.textContent = popupInputName.value.trim();
  console.dir(profileTitle);
  profileDescr.textContent = popupInputDescr.value.trim();
}

editButton.addEventListener('click', () => {
  fillPopup();
  openPopup();
});

closeButton.addEventListener('click', closePopup);

popup.addEventListener('click', (e) => {
  if (e.target === popup) {
    closePopup();
  }
});

editForm.addEventListener('submit', (e) => {
  e.preventDefault();
  closePopup();
  changeProfileValues();
});
