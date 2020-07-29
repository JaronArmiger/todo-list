import "../styles/style.css";
//import { todo }            from "./todo";
//import { project }         from "./project";
import { domManipulation } from "./domManipulation"
import { todosManager }    from "./todosManager";
import { projectsManager } from "./projectsManager";

console.log(projectsManager.getArray());
todosManager.createTodo({description: "taco tuesday",
						 dueDate: "5/3/21"});

projectsManager.createProject("bread");
const defaultProject = projectsManager.getProjectByID(0);
const projectsArray = projectsManager.getArray();
console.log(projectsArray);
domManipulation.populateProjectSelect(projectsArray);

window.onload = (e) => {
  console.log("i said that")
}