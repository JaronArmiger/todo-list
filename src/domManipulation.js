const newTodoButton = document.querySelector('#new-todo-btn');
const newTodoForm = document.querySelector('#new-todo-form');
const projectSelect = document.querySelector('#project-select');

const toggleForm = () => {
  newTodoButton.addEventListener('click', (e) => {
  	const btn = e.target;
  	btn.classList.toggle("invert");
  	newTodoForm.classList.toggle("expand");
  })
}

const populateElement = (list, element, fn) => {
  list.forEach(item => {
  	const child = fn(item);
  	element.appendChild(child);
  })
}

const createProjectOption = (project) => {
  const option = document.createElement('option');
  option.setAttribute("value", project.id);

  option["name"] = project.name;
  option.textContent = project.name;
  return option;
}



const domManipulation = (() => {
  toggleForm();
  const populateProjectSelect = (list) => {
  	return populateElement(list, projectSelect, createProjectOption);
  }
  return {
    populateProjectSelect
  }
})();

export { domManipulation }