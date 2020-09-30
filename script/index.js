const buttonOpenForm = document.querySelector(".profile__edit-btn");
const buttonCloseForm = document.querySelector(".form__close-btn");
const form = document.querySelector(".form");


const formToggle = (event) => {
  form.classList.toggle("form_is-opened");

};

buttonOpenForm.addEventListener("click", formToggle);
buttonCloseForm.addEventListener("click", formToggle);



let formElement = document.querySelector('.form__container'); // Воспользуйтесь методом querySelector()
let nameInput = document.querySelector('.form__text_name'); // Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector('.form__text_discription'); // Воспользуйтесь 

nameInput.value += document.querySelector('.profile__info_name').textContent;
jobInput.value += document.querySelector('.profile__info_discription').textContent;
// Получите значение полей из свойства value
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault();
  document.querySelector('.profile__info_name').textContent = nameInput.value;
  document.querySelector('.profile__info_discription').textContent = jobInput.value;
  formToggle();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);