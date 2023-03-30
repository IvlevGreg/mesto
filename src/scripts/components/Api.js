export class Api {
  constructor({ baseUrl, headers: { authorization } }) {
    this._baseUrl = baseUrl;
    this._authorization = authorization;
    this._contentType = 'application/json';

    this.putLike = this.putLike.bind(this);
    this.deleteLike = this.deleteLike.bind(this);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._authorization,
      },
    }).then((res) => res.json());
  }

  postNewCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._authorization,
        ['Content-Type']: this._contentType,
      },
      body: JSON.stringify({
        name,
        link,
      }),
    }).then((res) => res.json());
  }

  putLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._authorization,
      },
    }).then((res) => res.json());
  }

  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: '7a43c762-4e63-438c-856b-e056a5084ee3',
      },
    }).then((res) => res.json());
  }

  getUserdata() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._authorization,
      },
    }).then((res) => res.json());
  }
}
