const newTodoButton = document.querySelector('#new-todo-btn');
const newTodoForm = document.querySelector('#new-todo-form');

const toggleForm = () => {
  newTodoButton.addEventListener('click', (e) => {
  	const btn = e.target;
  	btn.classList.toggle("invert");
  	newTodoForm.classList.toggle("expand");
  	//btn.style.transform = "rotate(180deg)";
  })
}

/*
const toggleElement = (button, element) => {
  button.addEventListener('click', () => {
  	if (element.style.display === "none") {
  	  element.style.display = "block";
  	} else {
  	  element.style.display = "none";
  	}
  })
}
*/
const domManipulation = (() => {
  //toggleElement(newTodoButton,newTodoForm);
  toggleForm();
})();

export { domManipulation }