export default class Api {
    constructor({baseUrl, headers}){
    this._url = baseUrl;
    this._headers = headers;
    }

    //запрос на начальные карточки 
    getInitialCards() {
        return fetch(`${this._url}/cards`,{
            method:"GET",
            headers: this._headers,
        }).then((res) => this._addResult(res));
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            method: "GET",
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