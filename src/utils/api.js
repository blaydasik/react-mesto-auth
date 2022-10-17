import { apiSettings } from './constants.js';

class Api {

  //входные данные - адрес для запроса и объект заголовка
  constructor({ link, headers }) {
    this.link = link;
    this.headers = headers;
  }

  //приватный универсальный метод запроса с проверкой ответа
  _request(url, options) {
    return fetch(url, options).then(this._validateAnswer)
  }

  //приватный метод проверки ответа сервера
  _validateAnswer(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  //публичный метод, получающий информацию о пользователе с сервера
  downloadUserInfo() {
    return this._request(`${this.link}/users/me`, {
      headers: this.headers
    })
  }

  //публичный метод, загружающий карточки с сервера
  downloadCards() {
    return this._request(`${this.link}/cards`, {
      headers: this.headers
    })
  }

  //публичный метод, обновляющий данные пользователя на сервере
  setNewUserInfo(userData) {
    return this._request(`${this.link}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(userData)
    })
  }

  //публичный метод, добавляющий карточку на сервер
  addNewCard(cardData) {
    return this._request(`${this.link}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(cardData)
    })
  }

  //публичный метод, удаляющий карточку с сервера
  deleteCard(cardID) {
    return this._request(`${this.link}/cards/${cardID}`, {
      method: "DELETE",
      headers: this.headers,
    })
  }

  //публичный метод для постановки/удаления лайка
  proceedLike(cardID, state) {
    return this._request(`${this.link}/cards/${cardID}/likes`, {
      method: (state ? "DELETE" : "PUT"),
      headers: this.headers,
    })
  }

  //публичный метод для обновления аватара пользователя
  updateUserAvatar(link) {
    return this._request(`${this.link}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: link
      })
    })
  }

}

//создадим экземпляр класса для работы с Api
const workingApi = new Api(apiSettings);
export default workingApi;