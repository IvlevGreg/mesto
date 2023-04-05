export class UserInfo {
  constructor(data, selectorTemplate, { handleImgClick }) {
    const { name, about, avatar } = data;
    this._name = name;
    this._about = about;
    this._avatar = avatar;

    this._template = document.getElementById(selectorTemplate).content;
    this._sectionElement = this._template
      .querySelector('.container')
      .cloneNode(true);

    this._imgButtonElement =
      this._sectionElement.querySelector('.profile__img-btn');
    this._imgElement = this._sectionElement.querySelector('.profile__img');
    this._nameElement = this._sectionElement.querySelector('.profile__title');
    this._aboutElement = this._sectionElement.querySelector('.profile__descr');

    this._handleImgClick = handleImgClick;
  }

  _setEventListener() {
    this._imgButtonElement.addEventListener('click', this._handleImgClick);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent,
    };
  }

  setUserInfo({ name, about }) {
    this._nameElement.textContent = name;
    this._aboutElement.textContent = about;
  }

  setUserImg({ avatar }) {
    this._imgElement.src = avatar;
  }

  createUser() {
    this._imgElement.src = this._avatar;
    this._imgElement.alt = `аватар пользователя: ${this._name}`;

    this._nameElement.textContent = this._name;
    this._aboutElement.textContent = this._about;

    this._setEventListener();

    return this._sectionElement;
  }
}
