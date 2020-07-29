const todo = ({description, dueDate, priority, id, projectID}) => ({
  description, dueDate, priority, id, projectID, completed: false
});

export { todo }