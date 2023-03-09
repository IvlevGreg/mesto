const popupCard = document.querySelector('.popup_card');
const popupName = popupCard.querySelector('.popup__name');
const popupImg = popupCard.querySelector('.popup__img');

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.body.classList.add('pages_popup-opened');
  popup.addEventListener('keyup', closePopupKeyEscape);
}

function closePopupKeyEscape(evt) {
  if (evt.key == 'Escape') {
    const popup = document.querySelector('.popup_opened');
    if (popup) closePopup(popup);
  }
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.body.classList.remove('pages_popup-opened');
  popup.removeEventListener('keyup', closePopupKeyEscape);
}

function fillPopupCard(name, src, alt) {
  popupName.textContent = name;
  popupImg.src = src;
  popupImg.alt = alt;
}

function disableButton(button, inactiveButtonClass) {
  button.classList.add(inactiveButtonClass);
  button.disabled = true;
}

export { openPopup, closePopup, fillPopupCard, popupCard, disableButton };
