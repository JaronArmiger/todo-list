import { todo }            from "./todo";
import { projectsManager } from "./projectsManager";

const todosManager = (() => {
  let todosArray = [];
  let todosCounter = 0;
  const createTodo = ({description,dueDate,priority=5,projectID=0}) => {
  	const newTodo = todo({description,dueDate,
  							priority,id: todosCounter,projectID});
  	if (newTodo && projectsManager.projectExists(projectID)) {  
  	  todosCounter++;
  	  todosArray.push(newTodo);
  	  projectsManager.addTodoToProject(projectID,newTodo.id);
  	  return newTodo;
  	}
  };
  const getTodoByID = (todoID) => {
  	return todosArray.find(t => t.id === todoID);
  }
  return { createTodo, getTodoByID }
})();

export { todosManager }