import { eventAggregator } from "./eventAggregator";

const newTodoButton = document.querySelector('#new-todo-btn');
const newTodoForm = document.querySelector('#new-todo-form');
const projectSelect = document.querySelector('#project-select');
const dueDateInput = document.querySelector('#dueDate-input');
const todoListDiv = document.querySelector('#todo-list');

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

const setUpForm = () => {
  setDefaultDate();
  eventAggregator.subscribe("projectListSent", (projectList) => {
  	populateProjectSelect(projectList);
  });
}

const setUpTodoList = () => {
  eventAggregator.subscribe("todoListSent", (todoList) => {
  	console.log("setUpTodoList");
  	populateTodoList(todoList);
  })
}

const handleFormSubmit = (e) => {
  e.preventDefault();
  const form = e.target;
  const description = form["description-input"].value;
  const dueDate = form["dueDate-input"].value;
  const priority = parseInt(form["priority-select"].value);
  const projectID = parseInt(form["project-select"].value);
  const todoInfo = {
  	description, dueDate, priority, projectID
  };
  eventAggregator.publish("todoInfoSent", todoInfo);
}

const populateElement = (list, element, fn) => {
  element.innerHTML = "";
  list.forEach(item => {
  	const child = fn(item);
  	element.appendChild(child);
  })
}

const populateProjectSelect = (list) => {
 return populateElement(list, projectSelect, createProjectOption);
}

const populateTodoList = (list) => {
  return populateElement(list, todoListDiv, createTodoLi);
}

const createProjectOption = (project) => {
  const option = document.createElement('option');
  option.setAttribute("value", project.id);

  option["name"] = project.name;
  option.textContent = project.name;
  return option;
}

const createTodoLi = (todo) => {
  const li = document.createElement('li');
  li.innerHTML = `
  				   <span>${todo.description}</span>
  				   <span>${todo.projectID}</span>
  				   <span>${todo.dueDate}</span>
  				   <span>${todo.priority}</span>
  				 `		
  return li;
}

const domManipulation = (() => {
  toggleForm();
  newTodoForm.addEventListener('submit', handleFormSubmit)
  setUpForm();
  setUpTodoList();
  return {
    
  }
})();

export { domManipulation }