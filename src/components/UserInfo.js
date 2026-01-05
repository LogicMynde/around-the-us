export default class UserInfo {
  constructor({ nameElement, aboutElement, avatarElement }) {
    this._userName = document.querySelector(nameElement);
    this._userAbout = document.querySelector(aboutElement);
    this._userAvatar = document.querySelector(avatarElement);
  }

  setUserInfo(userData) {
    this._userName.textContent = userData.name;
    this._userAbout.textContent = userData.about;
  }

  setUserAvatar(userData) {
    this._userAvatar.src = userData.avatar;
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._userAbout.textContent,
      avatar: this._userAvatar.src,
    };
  }
}
