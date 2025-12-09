
export const profileName = document.querySelector('.profile__title');
export const profileAbout = document.querySelector('.profile__descr');
export const profileAvatar = document.querySelector('.profile__img');

export const newCardModal = document.querySelector("#element-add-modal");
export const elementAddForm = newCardModal.querySelector("#element-add-form");

export const profileEditModal = document.querySelector("#profile-edit-modal");
export const profileEditButton = document.querySelector(".profile__edit-button");
export const profileTitleInput = document.querySelector("#title-input");
export const profileDescriptionInput = document.querySelector("#profile-input");
export const profileEditForm = profileEditModal.querySelector("#profile-edit-form");
export const profileCloseButton = profileEditModal.querySelector("#modal-profile-close-button");
export const profileAvatarInput = document.querySelector("#avatar-input");
export const profileAvatarModal = document.querySelector("#profile-avatar-modal");
export const profileAvatarForm = profileAvatarModal.querySelector("#profile-avatar-form");
export const profileAvatarButton = document.querySelector(".profile__avatar-button");
export const profileAvatarModalCloseButton = document.querySelector("#profile-avatar-close-button");

export const elementAddButton = document.querySelector(".profile__add-button");
export const elementCloseButton = newCardModal.querySelector("#element-add-close");

export const elementList = document.querySelector(".elements__list");
export const elNameInput = newCardModal.querySelector("#element-input");
export const elUrlInput = newCardModal.querySelector("#image-input");
export const elModalButton = document.querySelector(".modal__button");

export const elementImageModal = document.querySelector("#element-image-modal");
export const elementImageModalCloseButton = elementImageModal.querySelector("#element-image-close");
export const modalImage = document.querySelector("#element-modal-image");
export const modalCaption = document.querySelector("#element-modal-caption");

export const elementConfirmationModal = document.querySelector("#element-confirmation-modal");
export const elementDeleteConfirmationButton = document.querySelector("#element-confirmation-button");

export const cardSelector = "#element-template";

export const formValidatorConfig = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible",
  };

export const initializeCards = [
    {
      name: "Yosemite Valley",
      url: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
    },
    {
      name: "Lake Louise",
      url: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
    },
    {
      name: "Bald Mountains",
      url: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
    },
    {
      name: "Latemar",
      url: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
    },
    {
      name: "Vanoise National Park",
      url: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
    },
    {
      name: "Lago di Braies",
      url: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
    },
  ];
