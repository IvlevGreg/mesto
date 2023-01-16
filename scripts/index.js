const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = popup.querySelector('.close-btn');
const editForm = popup.querySelector('.edit-form');

function openPopup() {
  popup.classList.add('popup_opened');
  document.body.classList.add('pages_popup-opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
  document.body.classList.remove('pages_popup-opened');
}

function fillPopup() {
  const popupInputName = popup.querySelector('.edit-form__input_name');
  const popupInputDescr = popup.querySelector('.edit-form__input_descr');
  const profileName = document.querySelector('.profile__name');
  const profileDescr = document.querySelector('.profile__descr');

  popupInputName.value = profileName.textContent.trim();
  popupInputDescr.value = profileDescr.textContent.trim();
}

function changeProfileValues() {
  const popupInputName = popup.querySelector('.edit-form__input_name');
  const popupInputDescr = popup.querySelector('.edit-form__input_descr');
  const profileName = document.querySelector('.profile__name');
  const profileDescr = document.querySelector('.profile__descr');

  profileName.textContent = popupInputName.value.trim();
  console.dir(profileName);
  profileDescr.textContent = popupInputDescr.value.trim();
}

// setTimeout(() => {
//   changeProfileValues();
//   console.log('ch');
// }, 5000);

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
