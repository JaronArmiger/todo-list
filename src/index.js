import "../styles/style.css";
//import { todo }            from "./todo";
//import { project }         from "./project";
import { domManipulation } from "./domManipulation";
import { todosManager }    from "./todosManager";
import { projectsManager } from "./projectsManager";
import { eventAggregator } from "./eventAggregator";

todosManager.createTodo({description: "taco tuesday",
						 dueDate: "6/3/21"});
todosManager.createTodo({description: "jewelry below",
						 dueDate: "7/3/21",
						 projectID: 1});
todosManager.createTodo({description: "bust down",
						 dueDate: "8/3/21"});
todosManager.createTodo({description: "hey bally",
						 dueDate: "2/3/21"});
todosManager.createTodo({description: "get money",
						 dueDate: "3/3/21",
						 projectID: 2
						});

projectsManager.createProject("bread");
projectsManager.createProject("dumb off a bean");
projectsManager.createProject("gum gum");
/*
const defaultProject = projectsManager.getProjectByID(0);
const projectsArray = projectsManager.getArray();
console.log(projectsArray);
domManipulation.populateProjectSelect(projectsArray);

window.onload = (e) => {
  console.log("i said that")
}
*/

//todosManager.sendTodoList();
console.log("ay")
console.log(todosManager.getArray()[0].projectID);
//console.log(todosManager.getArray());
//console.log(eventAggregator.getArray());








