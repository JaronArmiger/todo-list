import { eventAggregator } from "./eventAggregator";

const todo = ({description, dueDate, priority, id, projectID}) => ({
  description, dueDate, priority, id, projectID, completed: false
});

const todosManager = (() => {
  let todosArray = [];
  let todosCounter = 0;
  const createTodo = ({description,dueDate,priority=5,projectID=0}) => {
  	const newTodo = todo({description,dueDate,
  							          priority,id: todosCounter,
                          projectID});
  	if (newTodo) {  
  	  todosCounter++;
  	  todosArray.push(newTodo);
  	  eventAggregator.publish("todoSent", newTodo);
      sendTodoList();
  	  return newTodo;
  	} else {
      console.log("failed to create");
    }
  };

  const getTodoByID = (todoID) => {
  	return todosArray.find(t => t.id === todoID);
  }

  eventAggregator.subscribe("newTodoInfoSent", (todoInfo) => {
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