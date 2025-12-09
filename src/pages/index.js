import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";
import {
  profileAbout,
  profileName,
  initializeCards,
  formValidatorConfig,
  profileEditModal,
  profileEditButton,
  profileAvatarButton,
  profileTitleInput,
  profileAvatarInput,
  profileDescriptionInput,
  profileEditForm,
  newCardModal,
  elementAddButton,
  elementCloseButton,
  profileCloseButton,
  elementAddForm,
  elementList,
  elNameInput,
  elUrlInput,
  elementImageModal,
  cardSelector,
  profileAvatar,
  profileAvatarModal,
  profileAvatarModalCloseButton,
  elementConfirmationModal,
  elementConfirmationModalCloseButton,
  elementDeleteConfirmationButton
} from "../utils/constants.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import { Api } from "../utils/api.js";
import Popup from "../components/Popup.js";

/** 
  @todo fix Avatar modal behavior
  @todo add the "saving", "creating" and "deleting" lazy loading placeholder when creating and deleting cards and changing profile info
*/

document.addEventListener("DOMContentLoaded", () => {
  const api = new Api({
    baseUrl: "https://around-api.en.tripleten-services.com/v1",
    authorization: "36c19769-2369-480e-9e47-1ebd87ef991a",
  });

  const popupImage = new PopupWithImage("#element-image-modal");
  const popupAvatar = new PopupWithForm("#profile-avatar-modal", handleAvatarFormSubmit);
  const popupNewCard = new PopupWithForm("#element-add-modal", handleNewCardSubmit);
  const popupEditProfile = new PopupWithForm("#profile-edit-modal", handleProfileFormSubmit);
  const popupDeleteCardConfirmation = new Popup("#element-confirmation-modal");
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
        // Store the card reference for deletion
        cardToDelete = card;
        
        // Remove previous event listener if it exists
        if (deleteHandler) {
          elementDeleteConfirmationButton.removeEventListener("click", deleteHandler);
        }
        
        // Create new handler for this specific card
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
        
        // Add event listener to "Yes" button only
        elementDeleteConfirmationButton.addEventListener("click", deleteHandler);
        
        // Open the confirmation modal
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
        newCardFormValidator.disableButton();
        popupNewCard.renderLoading(false);
      })
      .catch((error) => {
        console.error(`Error creating a new card: ${error}`);
        popupNewCard.renderLoading(false);
      });
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
        popupEditProfile.renderLoading(false);
      })
      .catch((error) => {
        console.error(`Error updating user info: ${error}`);
        popupEditProfile.renderLoading(false);
      });
  }

  function handleAvatarFormSubmit(avatarData) {
    popupAvatar.renderLoading(true);

    api
      .updateUserAvatar(avatarData)
      .then((res) => {
        userInfo.setUserAvatar(res);
        popupAvatar.close();
        popupAvatar.renderLoading(false);
      })
      .catch((error) => {
        console.error(`Error updating user avatar: ${error}`);
        popupAvatar.renderLoading(false);
      });
  }

  profileAvatarModalCloseButton.addEventListener("click", () => popupAvatar.close());

  elementAddButton.addEventListener("click", () => {
    popupNewCard.open();
    newCardFormValidator.resetValidation();
  });

  elementCloseButton.addEventListener("click", () => popupNewCard.close());

  elementAddForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = elNameInput.value;
    const link = elUrlInput.value;
    handleNewCardSubmit({ name, link });
  });

  profileEditButton.addEventListener("click", () => {
    popupEditProfile.open();
    profileFormValidator.resetValidation();
  });

  profileCloseButton.addEventListener("click", () => popupEditProfile.close());

  profileAvatarButton.addEventListener("click", () => {
    popupAvatar.open();
    avatarFormValidator.resetValidation();
  });
  
  popupAvatar.setEventListeners();

  profileEditForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = profileTitleInput.value;
    const about = profileDescriptionInput.value;
    handleProfileFormSubmit({ name, about });
  });

  api
    .getAppData()
    .then(({ cards, userData }) => {
      userInfo.setUserInfo(userData); // saves user name & description
      userInfo.setUserAvatar(userData); // supposed to save user avatar!

      cardList = new Section(
        {
          items: cards,
          renderer: createCard,
        },
        elementList
      );
      cardList.renderItems(); // fixed cards not loading
    })
    .catch((error) => console.error(`Error fetching initial data: ${error}`));

  profileFormValidator.enableValidation();
  newCardFormValidator.enableValidation();
  avatarFormValidator.enableValidation();
  avatarFormValidator.enableValidation();
});
