
/**
 * Represents a Popup component that can be opened and closed.
 */
export default class Popup {
    constructor({ popupSelector }) {
        this._popupElement = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);

        if (!this._popupElement) {
            console.error(`Element with selector ${popupSelector} not found!`);
        }
    }

    open() {
        console.log("popup opened!");
        this._popupElement.classList.add('modal_opened');
        document.addEventListener('keyup', this._handleEscClose);
    }

    close() {
        console.log("popup closed!");
        this._popupElement.classList.remove('modal_opened');
        document.removeEventListener('keyup', this._handleEscClose);
    }

    setEventListeners() {
        this._popupElement.addEventListener('mousedown', (event) => {
            if (event.target.classList.contains('modal') ||
                event.target.classList.contains('modal__close')) {
                    this.close(event.currentTarget);
                }
        });
    }

    _handleEscClose(event) {
        if (event.key === "Escape") {
            console.log("Popup closed via Escape Button!");
            this.close();
        }

    }
}