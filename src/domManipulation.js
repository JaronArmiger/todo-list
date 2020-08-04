import { eventAggregator } from "./eventAggregator";

const newTodoButton = document.querySelector('#new-todo-btn');
const newTodoForm = document.querySelector('#new-todo-form');
const projectSelect = document.querySelector('#project-select');
const dueDateInput = document.querySelector('#dueDate-input');
const todoListUL = document.querySelector('#todo-list');
const incompletedUL = document.querySelector('#incompleted');
const completedUL = document.querySelector('#completed');
const sidebar = document.querySelector('#side-bar');
const projectListUL = document.querySelector('#project-list');

const toggleForm = () => {
  newTodoButton.addEventListener('click', (e) => {
  	const btn = e.target;
  	btn.classList.toggle("invert");
  	newTodoForm.classList.toggle("hide");
    newTodoForm.reset();
  })
}

const renderProjectView = (projectID) => {
  eventAggregator.publish("projectIDSent", projectID);
}

const navigateProjectsBar = (choice = 0) => {
  const projectLis = projectListUL.childNodes;
  let firstCall = true;
  
  projectLis.forEach(li => {
    li.classList.remove('active-project');
    li.addEventListener('click', (e) => {
      projectLis.forEach(subLi => subLi.classList.remove('active-project'));
        e.target.classList.add('active-project');
        renderProjectView(parseInt(e.target.dataset.index));
        firstCall = false;
    }
  )});
  if (firstCall === true) {
    // on page load, default project should be set as active
    projectLis.item(choice).classList.add('active-project');
    renderProjectView(choice);
  }
}

const setDefaultDate = () => {
  // set default to this time tomorrow
  const now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  let day = now.getDate() + 1;
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
  const priority = parseInt(form["priority-select"].value);
  const projectID = parseInt(form["project-select"].value);
  const todoInfo = {
    description, dueDate, priority, projectID
  };
  eventAggregator.publish("newTodoInfoSent", todoInfo);
  form.reset();
  renderProjectView(parseInt(projectID));
  navigateProjectsBar(parseInt(projectID));
}

// set up
const setUpForm = () => {
  setDefaultDate();
  eventAggregator.subscribe("projectListSent", (projectList) => {
  	populateProjectSelect(projectList);
  });
}

const setUpTodoList = () => {
  eventAggregator.subscribe("todoListSent", (todoList) => {
  	console.log(todoList);
    const completed = todoList.filter(todo => todo.completed === true);
    console.log(completed);
    const incompleted = todoList.filter(todo => todo.completed === false);
    console.log(incompleted);
    populateTodoList(completed, true);
    populateTodoList(incompleted, false);
  })
}

const setUpProjectSideBar = () => {
  eventAggregator.subscribe("projectListSent", (projectList) => {
    populateProjectSideBar(projectList);
    navigateProjectsBar();
  });
}

// populate
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

const populateProjectSideBar = (list) => {
 return populateElement(list, projectListUL, createProjectLi);
}

const populateTodoList = (list,completed) => {
  if (completed === true) {
    return populateElement(list, completedUL, createTodoLi);
  } else {
    return populateElement(list, incompletedUL, createTodoLi);
  }
  
}


// create
const createProjectOption = (project) => {
  const option = document.createElement('option');
  option.setAttribute("value", project.id);

  option["name"] = project.name;
  option.textContent = project.name;
  return option;
}

const createProjectLi = (project) => {
  const li = document.createElement('li');
  li.setAttribute('id', `project-${project.id}`);
  li.setAttribute('class', 'project-li');
  li.setAttribute('data-index', project.id);
  li.textContent = project.name;
  return li;
}

const createTodoLi = (todo) => {
  const li = document.createElement('li');
  li.setAttribute("class", "todo-li")
  li.innerHTML = `
      <p>
      ${todo.description}
      ${todo.completed}
      </p>
      <p>
        due: ${todo.dueDate}
        priority: ${todo.priority}
      </p>
  				 `		
  return li;
}

const domManipulation = (() => {
  toggleForm();
  newTodoForm.addEventListener('submit', handleFormSubmit)
  setUpForm();
  setUpTodoList();
  setUpProjectSideBar();
  return {
    
  }
})();

export { domManipulation }