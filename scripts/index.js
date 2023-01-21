const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const createButton = document.querySelector('.profile__add-button');
const closeButton = popup.querySelector('.close-button');
const editForm = popup.querySelector('.popup-form_edit');
const createForm = popup.querySelector('.popup-form_create');
const profileDescr = document.querySelector('.profile__descr');
const popupInputName = popup.querySelector('.popup-form__input_name');
const popupInputDescr = popup.querySelector('.popup-form__input_descr');
const popupInputImgName = popup.querySelector('.popup-form__input_img-name');
const popupInputLink = popup.querySelector('.popup-form__input_link');
const profileTitle = document.querySelector('.profile__title');
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

function createPlaceCard(card, template, parent) {
  const elementLi = template.querySelector('.place__item').cloneNode(true);

  const img = elementLi.querySelector('.place__img');
  img.src = card.link;
  img.alt = card.alt || card.name;
  elementLi.querySelector('.place__name').textContent = card.name;

  parent.append(elementLi);
}

initialPlaceCards.forEach((card) => {
  createPlaceCard(card, templatePlaceItem, placeList);
});

function openPopup(modificator) {
  popup.classList.add(`popup_opened-${modificator}`);
  document.body.classList.add('pages_popup-opened');
  popup.querySelector('input').focus();
}

function closePopup() {
  popup.classList.remove(`popup_opened-create`);
  popup.classList.remove(`popup_opened-edit`);

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
  openPopup('edit');
});

createButton.addEventListener('click', () => {
  fillPopup();
  openPopup('create');
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

createForm.addEventListener('submit', (e) => {
  e.preventDefault();
  closePopup();
  const card = {
    name: popupInputImgName.value.trim(),
    link: popupInputLink.value.trim(),
  };

  createPlaceCard(card, templatePlaceItem, placeList);
  changeProfileValues();
});
