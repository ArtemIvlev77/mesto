export default class Api {
    constructor({
        baseUrl,
        headers
    }) {
        this._url = baseUrl;
        this._headers = headers;
    }

    //запрос на начальные карточки 
    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            method: "GET",
            headers: this._headers,
        }).then((res) => this._addResult(res));
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            method: "GET",
            headers: this._headers,
        }).then((res) => this._addResult(res));
    }

    editUserInfo(data) {
        return fetch(`${this._url}/users/me/`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.job,
            }),
        }).then((res) => this._addResult(res));
    }

    editUserAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar,
            }),
        }).then((res) => this._addResult(res));
    }

    addCard(
        name,
        link
    ) {
        return fetch(`${this._url}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name,
                link
            }),
        }).then((res) => this._addResult(res));
    }

    setLikes(cardId) {
        return fetch(`${this._url}/cards/likes/${cardId}`, {
            method: "PUT",
            headers: this._headers,
        }).then((res) => this._addResult(res));
    }

    delLikes(cardId) {
        return fetch(`${this._url}/cards/likes/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
        }).then((res) => this._addResult(res));
    }

    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
        }).then((res) => this._addResult(res));
    }

    _addResult(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }
}