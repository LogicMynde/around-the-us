import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";
import {
  formValidatorConfig,
  profileEditModal,
  profileEditButton,
  profileAvatarButton,
  profileTitleInput,
  profileDescriptionInput,
  newCardModal,
  elementAddButton,
  elementList,
  profileAvatarModal,
  elementDeleteConfirmationButton,
} from "../utils/constants.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import { Api } from "../utils/api.js";
import Popup from "../components/Popup.js";

document.addEventListener("DOMContentLoaded", () => {
  const api = new Api({
    baseUrl: "https://around-api.en.tripleten-services.com/v1",
    authorization: "36c19769-2369-480e-9e47-1ebd87ef991a",
  });

  const popupImage = new PopupWithImage("#element-image-modal");
  const popupAvatar = new PopupWithForm(
    "#profile-avatar-modal",
    handleAvatarFormSubmit
  );
  const popupNewCard = new PopupWithForm(
    "#element-add-modal",
    handleNewCardSubmit
  );
  const popupEditProfile = new PopupWithForm(
    "#profile-edit-modal",
    handleProfileFormSubmit
  );
  const popupDeleteCardConfirmation = new Popup("#element-confirmation-modal");

  popupImage.setEventListeners();
  popupAvatar.setEventListeners();
  popupNewCard.setEventListeners();
  popupEditProfile.setEventListeners();
  popupDeleteCardConfirmation.setEventListeners();

  const newCardFormValidator = new FormValidator(
    formValidatorConfig,
    newCardModal
  );

  const profileFormValidator = new FormValidator(
    formValidatorConfig,
    profileEditModal
  );

  const avatarFormValidator = new FormValidator(
    formValidatorConfig,
    profileAvatarModal
  );

  let cardList;

  function handlePicturePopup(name, link) {
    popupImage.open(name, link);
  }

  let cardToDelete = null;
  let deleteHandler = null;

  function createCard(cardData) {
    const card = new Card(
      cardData,
      "#element-template",
      handlePicturePopup,
      () => {
        cardToDelete = card;

        if (deleteHandler) {
          elementDeleteConfirmationButton.removeEventListener(
            "click",
            deleteHandler
          );
        }

        deleteHandler = () => {
          api
            .deleteCard(cardData._id)
            .then(() => {
              cardToDelete.removeCard();
              popupDeleteCardConfirmation.close();
              cardToDelete = null;
            })
            .catch((error) => console.error(`Error deleting card: ${error}`));
        };

        elementDeleteConfirmationButton.addEventListener(
          "click",
          deleteHandler
        );

        popupDeleteCardConfirmation.open();
      },
      handleLikeButton
    );

    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }

  function handleLikeButton(cardId) {
    if (this.isLiked()) {
      api
        .dislikeCard(cardId)
        .then((res) => this.setIsLiked(res.isLiked))
        .catch((error) => console.error(error));
    } else {
      api
        .likeCard(cardId)
        .then((res) => this.setIsLiked(res.isLiked))
        .catch((error) => console.error(error));
    }
  }

  function handleNewCardSubmit(cardData) {
    popupNewCard.renderLoading(true);

    api
      .createCard(cardData)
      .then((res) => {
        createCard(res);
        popupNewCard.resetForm();
        popupNewCard.close();
      })
      .catch((error) => console.error(`Error creating a new card: ${error}`))
      .finally(() => popupNewCard.renderLoading(false));
  }

  const userInfo = new UserInfo({
    nameElement: ".profile__title",
    aboutElement: ".profile__descr",
    avatarElement: ".profile__img",
  });

  function handleProfileFormSubmit(userData) {
    popupEditProfile.renderLoading(true);

    api
      .updateUserInfo(userData)
      .then((res) => {
        userInfo.setUserInfo(res);
        popupEditProfile.close();
      })
      .catch((error) => console.error(`Error updating user info: ${error}`))
      .finally(() => popupEditProfile.renderLoading(false));
  }

  function handleAvatarFormSubmit(avatarData) {
    popupAvatar.renderLoading(true);

    api
      .updateUserAvatar(avatarData)
      .then((res) => {
        userInfo.setUserAvatar(res);
        popupAvatar.resetForm();
        popupAvatar.close();
      })
      .catch((error) => console.error(`Error updating user avatar: ${error}`))
      .finally(() => popupAvatar.renderLoading(false));
  }

  elementAddButton.addEventListener("click", () => {
    popupNewCard.open();
  });

  profileEditButton.addEventListener("click", () => {
    const { name, about } = userInfo.getUserInfo();
    profileTitleInput.value = name;
    profileDescriptionInput.value = about;
    profileFormValidator.resetValidation();
    popupEditProfile.open();
  });

  profileAvatarButton.addEventListener("click", () => {
    popupAvatar.open();
  });

  api
    .getAppData()
    .then(({ cards, userData }) => {
      userInfo.setUserInfo(userData);
      userInfo.setUserAvatar(userData);

      cardList = new Section(
        {
          items: cards,
          renderer: createCard,
        },
        elementList
      );
      cardList.renderItems();
    })
    .catch((error) => console.error(`Error fetching initial data: ${error}`));

  profileFormValidator.enableValidation();
  newCardFormValidator.enableValidation();
  avatarFormValidator.enableValidation();
});
