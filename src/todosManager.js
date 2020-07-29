import { todo }            from "./todo";
import { projectsManager } from "./projectsManager";
import { eventAggregator } from "./eventAggregator";

const todosManager = (() => {
  let todosArray = [];
  let todosCounter = 0;
  const createTodo = ({description,dueDate,priority=5,projectID=0}) => {
  	const newTodo = todo({description,dueDate,
  							          priority,id: todosCounter,
                          projectID});
  	if (newTodo && projectsManager.projectExists(projectID)) {  
  	  todosCounter++;
  	  todosArray.push(newTodo);
  	  projectsManager.addTodoToProject(projectID,newTodo.id);
      sendTodoList();
  	  return newTodo;
  	} else {
      console.log("failed to create");
    }
  };
  const getTodoByID = (todoID) => {
  	return todosArray.find(t => t.id === todoID);
  }
  eventAggregator.subscribe("todoInfoSent", (todoInfo) => {
    createTodo(todoInfo);
     console.log("post-creation");
     console.log(todosArray);
  });

  const sendTodoList = () => {
    eventAggregator.publish("todoListSent", todosArray);
  }

  const getArray = () => todosArray;
  return { createTodo, getTodoByID, getArray, sendTodoList }
})();

export { todosManager }