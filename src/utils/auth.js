import { authSettings } from './constants.js';

//универсальный метод запроса с проверкой ответа
function request(url, options) {
  return fetch(url, options).then(validateAnswer);
}

//метод проверки ответа сервера
function validateAnswer(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

//запрос для регистрации нового пользователя
export const register = (account) => {
  return request(`${authSettings.link}/signup`, {
    method: "POST",
    headers: authSettings.headers,
    body: JSON.stringify(account)
  });
}

//запрос для авторизации пользователя
export const login = (account) => {
  return request(`${authSettings.link}/signin`, {
    method: "POST",
    headers: authSettings.headers,
    body: JSON.stringify(account)
  });
}

//запрос для проверки валидности токена и получения email
export const checkToken = (token) => {
  return request(`${authSettings.link}/users/me`, {
    method: "GET",
    headers: 
      {authSettings,
      Authorization : `Bearer ${token}`}
  });
}