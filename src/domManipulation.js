const newTodoButton = document.querySelector('#new-todo-btn');
const newTodoForm = document.querySelector('#new-todo-form');
const projectSelect = document.querySelector('#project-select');
const dueDateInput = document.querySelector('#dueDate-input');

const toggleForm = () => {
  newTodoButton.addEventListener('click', (e) => {
  	const btn = e.target;
  	btn.classList.toggle("invert");
  	newTodoForm.classList.toggle("hide");
  })
}

const setDefaultDate = () => {
  // set default to this time tomorrow
  const now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  let day = now.getDate() + 1;
  console.log(day)
  if ((day / 10) < 1) {
  	day = "0" + day;
  }
  if ((month / 10) < 1) {
  	month = "0" + month;
  }
  const tomorrow = `${year}-${month}-${day}`;
  dueDateInput.setAttribute("value", tomorrow);
}

const handleFormSubmit = (e) => {
  e.preventDefault();
  const form = e.target;
  const description = form["description-input"].value;
  const dueDate = form["dueDate-input"].value;
  console.log(dueDate)
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
  setDefaultDate();
  newTodoForm.addEventListener('submit', handleFormSubmit)
  const populateProjectSelect = (list) => {
  	return populateElement(list, projectSelect, createProjectOption);
  }
  return {
    populateProjectSelect
  }
})();

export { domManipulation }