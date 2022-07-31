class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    _getResponse(url, fetchOptions) {
        return fetch(this._baseUrl + url, fetchOptions)
        .then(res => {
            if(res.ok) {
                return res.json()
            }
            return Promise.reject(res.status);
        })
    }

    getInitialCards() {
        return this._getResponse('cards', {
            headers: this._headers
          })
    }

    getUserInfo() {
        return this._getResponse('users/me', {
            headers: this._headers
          })
    }

    setUserInfo(name, about) {
        return this._getResponse('users/me', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
                })
        })
    }

    setAvatar(avatar) {
        return this._getResponse('users/me/avatar', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatar
                })
        })
    }
    
    setCard(name, link) {
        return this._getResponse('cards', {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
                })
        })
    }

    deleteCard(cardId) {
        return this._getResponse(`cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
    }

    addLike(cardId) {
        return this._getResponse(`cards/likes/${cardId}`, {
            method: 'PUT',
            headers: this._headers
        })
    }

    deleteLike(cardId) {
        return this._getResponse(`cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
    }

    changeLikeCardStatus(cardId, isLiked) {
        return this._getResponse(`cards/likes/${cardId}`, {
            method: `${!isLiked ? 'DELETE' : 'PUT'}`,
            headers: this._headers
        })
    }
}

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-40/',
    headers: {
      authorization: 'e84f36fa-3432-4afc-bd0c-317440cd59c0',
      'Content-type': 'application/json'
    }
});

export default api;