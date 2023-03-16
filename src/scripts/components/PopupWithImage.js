import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector, buttonCloseSelector) {
    super(popupSelector, buttonCloseSelector);
    this._popupName = this._popup.querySelector('.popup__name');
    this._popupImg = this._popup.querySelector('.popup__img');
  }
  open(name, src, alt = name) {
    super.open();

    this._popupName.textContent = name;
    this._popupImg.src = src;
    this._popupImg.alt = alt;
  }
}
