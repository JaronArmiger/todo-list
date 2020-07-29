const todo = ({title, description, dueDate, priority, id, projectID}) => ({
  title, description, dueDate, priority, id, projectID, completed: false
});

export { todo }