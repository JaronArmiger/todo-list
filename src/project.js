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

export { project }