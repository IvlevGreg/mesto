const popupForm = document.querySelector('.popup');
const popupCard = document.querySelector('.popup_card');
const editButton = document.querySelector('.profile__edit-button');
const createButton = document.querySelector('.profile__add-button');
const closeButtonPopupForm = popupForm.querySelector('.close-button');
const closeButtonPopupCard = popupCard.querySelector(
  '.popup__close-button_card'
);
const popupName = popupCard.querySelector('.popup__name');
const popupImg = popupCard.querySelector('.popup__img');

const editForm = popupForm.querySelector('.popup-form_edit');
const createForm = popupForm.querySelector('.popup-form_create');
const profileDescr = document.querySelector('.profile__descr');
const popupInputName = popupForm.querySelector('.popup-form__input_name');
const popupInputDescr = popupForm.querySelector('.popup-form__input_descr');
const popupInputImgName = popupForm.querySelector(
  '.popup-form__input_img-name'
);
const popupInputLink = popupForm.querySelector('.popup-form__input_link');
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

function createPlaceCard(card, template) {
  const elementLi = template.querySelector('.place__item').cloneNode(true);

  const img = elementLi.querySelector('.place__img');
  img.src = card.link;
  const alt = card.alt || card.name;
  img.alt = alt;
  elementLi.querySelector('.place__name').textContent = card.name;

  const likeButton = elementLi.querySelector('.place__like-button');
  likeButton.addEventListener('click', (e) =>
    e.target.classList.toggle('like-button_active')
  );

  const removeButton = elementLi.querySelector('.place__remove-button');
  removeButton.addEventListener('click', (e) => elementLi.remove());

  const openPopup = elementLi.querySelector('.place__open-popup-button');
  openPopup.addEventListener('click', () => {
    fillPopupCard(card.name, card.link, alt);
    openPopupCard();
  });

  return elementLi;
}

initialPlaceCards.forEach((card) => {
  placeList.append(createPlaceCard(card, templatePlaceItem));
});

function openPopupForm(modificator) {
  popupForm.classList.add(`popup_opened-${modificator}`);
  document.body.classList.add('pages_popup-opened');
  popupForm.querySelector('input').focus();
}

function closePopupForm() {
  popupForm.classList.remove(`popup_opened-create`);
  popupForm.classList.remove(`popup_opened-edit`);

  document.body.classList.remove('pages_popup-opened');
}

function fillPopupForm() {
  popupInputName.value = profileTitle.textContent.trim();
  popupInputDescr.value = profileDescr.textContent.trim();
}

function changeProfileValues() {
  profileTitle.textContent = popupInputName.value.trim();
  profileDescr.textContent = popupInputDescr.value.trim();
}

function clearPopupForm() {
  popupInputImgName.value = '';
  popupInputLink.value = '';
}

editButton.addEventListener('click', () => {
  fillPopupForm();
  openPopupForm('edit');
});

createButton.addEventListener('click', () => {
  fillPopupForm();
  openPopupForm('create');
});

closeButtonPopupForm.addEventListener('click', closePopupForm);

popupForm.addEventListener('click', (e) => {
  if (e.target === popupForm) {
    closePopupForm();
  }
});

editForm.addEventListener('submit', (e) => {
  e.preventDefault();
  closePopupForm();
  changeProfileValues();
});

createForm.addEventListener('submit', (e) => {
  e.preventDefault();
  closePopupForm();
  const card = {
    name: popupInputImgName.value.trim(),
    link: popupInputLink.value.trim(),
  };

  placeList.prepend(createPlaceCard(card, templatePlaceItem));
  changeProfileValues();
  clearPopupForm();
});

function openPopupCard() {
  popupCard.classList.add('popup_opened');
  document.body.classList.add('pages_popup-opened');
}

function closePopupCard() {
  popupCard.classList.remove('popup_opened');

  document.body.classList.remove('pages_popup-opened');
}

function fillPopupCard(name, src, alt) {
  popupName.textContent = name;
  popupImg.src = src;
  popupImg.alt = alt;
}

popupCard.addEventListener('click', (e) => {
  if (e.target === popupCard) {
    closePopupCard();
  }
});

closeButtonPopupCard.addEventListener('click', () => {
  closePopupCard();
});
