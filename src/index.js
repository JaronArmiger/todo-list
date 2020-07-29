import "../styles/style.css";
//import { todo }            from "./todo";
//import { project }         from "./project";
import { todosManager } from "./todosManager";
import { projectsManager } from "./projectsManager";

console.log(projectsManager.getArray());
todosManager.createTodo({title: "taco", description: "taco tuesday",
						 dueDate: "5/3/21"});
const defaultProject = projectsManager.getProjectByID(0);
console.log(defaultProject.getArray());
