import { eventAggregator } from "./eventAggregator";

const project = ({name, id}) => {
  return { name, id }
}

const projectsManager = (() => {
  let projectsArray = [project({name: "default", id: 0})];
  let projectsCounter = 1;
  const createProject = (name) => {
  	let newProject = project({name, id: projectsCounter});
  	if (newProject) {
  	  projectsCounter++;
  	  projectsArray.push(newProject);
      sendProjectList();
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