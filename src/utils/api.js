export class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._authToken = options.authorization;
    }

    /**
     * 
     * @param {*} path the endpoint path
     * @param {*} method the HTTP method (GET, POST, PATCH, DELETE)
     * @param {*} data the data to be sent in the request body (for POST and PATCH)
     * @returns a promise that resolves to the response data
     * @description This method makes a request to the API with the specified path, method, and data.
     */
    _makeRequest(path, method, data = null) {
        const config = {
            method: method.toUpperCase(),
            headers: {
                authorization: this._authToken
            }
        }

        if (data) {
            config.headers["Content-Type"] = "application/json";
            config.body = JSON.stringify(data);
        }

        return fetch(`${this._baseUrl}${path}`, config)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                // Try to get error details from response body
                return res.json()
                    .then(errData => Promise.reject({ 
                        status: res.status, 
                        message: errData.message || errData,
                        data: errData 
                    }))
                    .catch(() => Promise.reject({ 
                        status: res.status, 
                        message: `HTTP Error ${res.status}` 
                    }));
            })
            .catch(err => {
                console.error(`Request to ${method.toUpperCase()} ${this._baseUrl}${path} failed: ${err.message || err.status || err}`);
                return Promise.reject(err);
            });
    }

    getInitialCards() {
        return this._makeRequest("/cards", "GET");
    }

    getUserInfo() {
        return this._makeRequest("/users/me", "GET");
    }

    getAppData() {
        return Promise.all([this.getInitialCards(), this.getUserInfo()])
            .then(([cards, userData]) => {
                return { cards, userData };
            })
            .catch(err => {
                console.error(`Error fetching app data: ${err}`);
                return Promise.reject(err);
            });
    }

    updateUserAvatar({ avatar }) {
        return this._makeRequest("/users/me/avatar", "PATCH", { avatar });
    }

    updateUserInfo(userData) {
        return this._makeRequest("/users/me", "PATCH", {
            name: userData.name,
            about: userData.about
        });
    }

    createCard(cardData) {
        return this._makeRequest("/cards", "POST", {
            name: cardData.name,
            link: cardData.link
        });
    }

    deleteCard(cardId) {
        return this._makeRequest(`/cards/${cardId}`, "DELETE");
    }

    likeCard(cardId) {
        return this._makeRequest(`/cards/${cardId}/likes`, "PUT");
    }

    dislikeCard(cardId) {
        return this._makeRequest(`/cards/${cardId}/likes`, "DELETE");
    }
}