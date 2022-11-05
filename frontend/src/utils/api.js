// Класс, который описывает запросы к серверу
class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  // Приватный метод, который проверяет доступность сервера
  _checkServerResponse(res) {
    if (res.ok) {
      return res.json();
    }

    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // Публичный метод, который подгружает начальные карточки с сервера
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      }
    })
      .then(this._checkServerResponse);
  }

  // Публичный метод, который подгружает начальную информацию о пользователе с сервера
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      }
    })
      .then(this._checkServerResponse);
  }

  // Публичный метод, который загружает информацию о пользователе на сервер
  sendUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(this._checkServerResponse);
  }

  // Публичный метод, который загружает аватар пользователе на сервер
  sendUserAvatar({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then(this._checkServerResponse);
  }

  // Публичный метод, который добавляет новую карточку на сервер
  postCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(this._checkServerResponse);
  }

  // Публичный метод, который удаляет карточку
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
    })
      .then(this._checkServerResponse);
  }

  // Публичный метод, который ставит лайк
  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
    })
      .then(this._checkServerResponse);
  }

  // Публичный метод, который снимает лайк
  removeLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
    })
      .then(this._checkServerResponse);
  }

  // другие методы работы с API
}

export const api = new Api({
  baseUrl: 'https://api.mesto.gss.nomoredomains.icu',
});