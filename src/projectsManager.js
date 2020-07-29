import { project }         from "./project";
import { todosManager }	   from "./todosManager";

const projectsManager = (() => {
  let projectsArray = [project({name: "default", id: 0})];
  let projectsCounter = 1;
  const createProject = (name) => {
  	let newProject = project({name, id: projectsCounter});
  	if (newProject) {
  	  projectsCounter++;
  	  projectsArray.push(newProject);
  	  return newProject;
  	}
  }
  const projectExists = (id) => {
  	return projectsArray.some(p => p.id === id);
  }
  const getProjectByID = (projectID) => {
  	return projectsArray.find(p => p.id === projectID);
  }
  const addTodoToProject = (projectID, todoID) => {
  	const theProject = getProjectByID(projectID);
  	const theTodo = todosManager.getTodoByID(todoID);
  	theProject.addTodo(theTodo);
  }
  const getArray = () => projectsArray;
  return { createProject, projectExists, getArray, getProjectByID,
  		   addTodoToProject
  		 }
})();

/*
const projectsManager = {
  elbow: "whipped"
}
*/
export { projectsManager }