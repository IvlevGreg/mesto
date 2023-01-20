const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = popup.querySelector('.close-button');
const editForm = popup.querySelector('.edit-form');
const profileDescr = document.querySelector('.profile__descr');
const popupInputName = popup.querySelector('.edit-form__input_name');
const popupInputDescr = popup.querySelector('.edit-form__input_descr');
const profileTitle = document.querySelector('.profile__title');

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
