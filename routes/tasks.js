const express = require('express');
const router = express.Router();
const Task = require('../models/taskModel');

// // Import tasks array from main application file
// const tasks = require('../index').tasks;

//Array to store tasks
let tasks = [];

// POST route to add a new task
router.post('/', (req, res,next) => {
  try{
  // Extract task data from request body
  const { title, description, status } = req.body;
  
  // Create a new task using Task Model
  const newTask = Task.createTask(title, description, status);

  // Add the new task to the tasks array
  tasks.push(newTask);

  // Return the newly created task
  res.status(201).json(newTask);
  }
  catch (err){
    // Pass the error to the next middleware function
    next(err);
  }
  finally{
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// GET route to retrieve all tasks
router.get('/', (req, res,next) => {
  try {
    // Return all tasks
    res.json(tasks);
  }
  catch (err){
    next(err);
  }

finally{
  res.status(500).json({ message: 'Internal Server Error' });
}
  });
  
// PUT/PATCH route to update an existing task
router.put('/:id', (req, res,next) => {
  try{
    const taskId = parseInt(req.params.id);
    const { title, description, status } = req.body;
  
    // Find the task by ID
    const taskToUpdate = tasks.find(task => task.id === taskId);
  
    // If task not found, return 404
    if (!taskToUpdate) {
      return res.status(404).json({ message: 'Task not found' });
    }
  
    // Update task with new data
    taskToUpdate.title = title || taskToUpdate.title;
    taskToUpdate.description = description || taskToUpdate.description;
    taskToUpdate.status = status || taskToUpdate.status;
  
    // Return the updated task
    res.json(taskToUpdate);
  } catch(error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
  });

  // DELETE route to delete a task
router.delete('/:id', (req, res,next) => {
  try{
    const taskId = parseInt(req.params.id);
    const { title, description, status } = req.body;

    //Find the index of the task to delete
    const taskIndex = tasks.findIndex(task => task.id == taskId);

    // If task not found, return 404
    if (taskIndex === -1) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Remove the task from the array
    tasks.splice(taskIndex, 1);

    // Return success message
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    // If an error occurs, return a 500 Internal Server Error
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
  
  
  module.exports = router;

  