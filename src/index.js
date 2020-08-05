import "../styles/style.css";
//import { todo }            from "./todo";
//import { project }         from "./project";
import { domManipulation } from "./domManipulation";
import { todosManager }    from "./todosManager";
import { projectsManager } from "./projectsManager";
import { eventAggregator } from "./eventAggregator";
if (projectsManager.getArray().length === 0) {
  projectsManager.createProject("default");	
} else {
  projectsManager.sendProjectList();
}

/*
projectsManager.createProject("dumb off a bean");
projectsManager.createProject("gum gum");
*/







