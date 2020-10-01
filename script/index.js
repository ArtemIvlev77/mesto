const buttonOpenForm = document.querySelector(".profile__edit-btn");
const buttonCloseForm = document.querySelector(".popup__close-btn");
const popup = document.querySelector(".popup");


const formToggle = () => {
  popup.classList.toggle("popup_is-opened");

};

buttonOpenForm.addEventListener("click", formToggle);
buttonCloseForm.addEventListener("click", formToggle);



const formElement = popup.querySelector('.popup__container');
const nameInput = popup.querySelector('.popup__name-imput');
const jobInput = popup.querySelector('.popup__job-input');
const profileName = popup.querySelector('.profile__name');
const profileJob = popup.querySelector('.profile__job');

nameInput.value += profileName.textContent;
jobInput.value += profileJob.textContent;

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  formToggle();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popup.addEventListener('submit', formSubmitHandler);