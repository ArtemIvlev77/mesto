const buttonOpenForm = document.querySelector(".profile__edit-btn");
const buttonCloseForm = document.querySelector(".popup__close-btn");
const form = document.querySelector(".popup");


const formToggle = () => {
  form.classList.toggle("popup_is-opened");

};

buttonOpenForm.addEventListener("click", formToggle);
buttonCloseForm.addEventListener("click", formToggle);



const formElement = document.querySelector('.popup__container'); // Воспользуйтесь методом querySelector()
const nameInput = document.querySelector('.popup__text_name'); // Воспользуйтесь инструментом .querySelector()
const jobInput = document.querySelector('.popup__text_discription'); // Воспользуйтесь 

nameInput.value += document.querySelector('.profile__name').textContent;
jobInput.value += document.querySelector('.profile__job').textContent;
// Получите значение полей из свойства value
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault();
  document.querySelector('.profile__name').textContent = nameInput.value;
  document.querySelector('.profile__job').textContent = jobInput.value;
  formToggle();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);