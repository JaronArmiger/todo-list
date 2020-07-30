import "../styles/style.css";
//import { todo }            from "./todo";
//import { project }         from "./project";
import { domManipulation } from "./domManipulation";
import { todosManager }    from "./todosManager";
import { projectsManager } from "./projectsManager";
import { eventAggregator } from "./eventAggregator";

todosManager.createTodo({description: "taco tuesday",
						 dueDate: "5/3/21"});

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
projectsManager.sendProjectList();
todosManager.sendTodoList();
//console.log(todosManager.getArray());
//console.log(eventAggregator.getArray());








