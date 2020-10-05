const popup = document.querySelector(".popup");
const buttonOpenForm = document.querySelector(".profile__edit-btn");
const buttonCloseForm = popup.querySelector(".popup__close-btn");

const formElement = popup.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__name-input');
const jobInput = formElement.querySelector('.popup__job-input');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const formToggle = () => {
  popup.classList.toggle("popup_is-opened");
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
};




buttonOpenForm.addEventListener("click", formToggle);
buttonCloseForm.addEventListener("click", formToggle);

function formSubmitHandler(evt) {
  evt.preventDefault();  
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  formToggle();
}



formElement.addEventListener('submit', formSubmitHandler);