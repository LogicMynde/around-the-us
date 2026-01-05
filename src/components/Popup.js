export default class Popup {
  constructor(popupSelectorOrOptions) {
    let popupSelector = null;

    if (typeof popupSelectorOrOptions === "string") {
      popupSelector = popupSelectorOrOptions;
    } else if (
      popupSelectorOrOptions &&
      typeof popupSelectorOrOptions === "object" &&
      popupSelectorOrOptions.popupSelector
    ) {
      popupSelector = popupSelectorOrOptions.popupSelector;
    }

    this._popupElement = popupSelector
      ? document.querySelector(popupSelector)
      : null;
    this._handleEscClose = this._handleEscClose.bind(this);

    if (!this._popupElement) {
      console.error(`Popup element for selector "${popupSelector}" not found!`);
    }
  }

  open() {
    if (!this._popupElement) {
      console.warn(
        "Attempted to open a Popup but the element was not found. Skipping open()."
      );
      return;
    }

    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keyup", this._handleEscClose);
  }

  close() {
    if (!this._popupElement) {
      console.warn(
        "Attempted to close a Popup but the element was not found. Skipping close()."
      );
      return;
    }

    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keyup", this._handleEscClose);
  }

  setEventListeners() {
    if (!this._popupElement) {
      console.warn(
        "setEventListeners() called but popup element was not found."
      );
      return;
    }

    this._popupElement.addEventListener("mousedown", (event) => {
      if (
        event.target.classList.contains("modal") ||
        event.target.classList.contains("modal__close")
      ) {
        this.close(event.currentTarget);
      }
    });
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }
}
