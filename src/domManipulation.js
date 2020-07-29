const newTodoButton = document.querySelector('#new-todo-btn');
const newTodoForm = document.querySelector('#new-todo-form');
const projectSelect = document.querySelector('#project-select');
const testDiv = document.querySelector('#test-div');

const toggleForm = () => {
  newTodoButton.addEventListener('click', (e) => {
  	const btn = e.target;
  	btn.classList.toggle("invert");
  	newTodoForm.classList.toggle("expand");
  })
}

const populateElement = (element, list, tag) => {
  list.forEach(item => {
  	const child = document.createElement(tag);
  	child.textContent = item;
  	element.appendChild(child);
  })
}
const domManipulation = (() => {
  toggleForm();
  const populateDiv = (list,tag) => {
  	return populateElement(testDiv,list,tag)
  }
  return {
  	populateDiv
  }
})();

export { domManipulation }