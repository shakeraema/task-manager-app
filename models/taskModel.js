//A simple object structure for tasks
const Task = {
  // Function to generate a unique ID for each task
  generateID: (() => {
    let counter = 0;
    return () => {
      counter++;
      return counter;
    };
  })(),

  // Function to create a new task object
  createTask(title, description, status = "To Do") {
    return {
      id: this.generateID(),
      title,
      description,
      status,
    };
  },
};

module.exports = Task;
