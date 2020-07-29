import { todosManager }	   from "./todosManager";
import { eventAggregator } from "./eventAggregator";

const project = ({name, id}) => {
  let todosArray = [];
  const hasTodo = (todoID) => {
    return todosArray.some(t => t.id === todoID);
  }
  const addTodo = (todo) => {
    todosArray.push(todo);
  }
  const getArray = () => todosArray;
  return { name, id, hasTodo, addTodo, getArray }
}

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
  	const theProject = getProjectByID(projectID) || createProject(`project-${projectsCounter}`);
    eventAggregator.subscribe("todoSent", (todoObject) => {
      theProject.addTodo(todoObject);
    })
  }

  const sendProjectList = () => {
    eventAggregator.publish("projectListSent", projectsArray);
  }

  const getArray = () => projectsArray;
  return { createProject, projectExists, getArray, getProjectByID,
  		   addTodoToProject, sendProjectList
  		 }
})();

/*
const projectsManager = {
  elbow: "whipped"
}
*/
export { projectsManager }