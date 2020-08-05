import { eventAggregator } from "./eventAggregator";

const project = ({name, id}) => {
  return { name, id }
}

const projectsManager = (() => {
  let projectsArray = [];
  let projectsCounter = 0;
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

  const sendProjectList = () => {
    eventAggregator.publish("projectListSent", projectsArray);
  }
  
  const sendProjectID = (projectID) => {
    eventAggregator.publish("receiveProjectID", projectID);
  }

  eventAggregator.subscribe("newProject", (projectName) => {
    const newProject = createProject(projectName);
    sendProjectList();
    sendProjectID(newProject.id);
  });

  const getArray = () => projectsArray;
  return { createProject, projectExists, getArray, getProjectByID,
  		    sendProjectList
  		 }
})();

/*
const projectsManager = {
  elbow: "whipped"
}
*/
export { projectsManager }