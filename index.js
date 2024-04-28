const express = require('express');
const app = express();
const tasksRouter = require('./routes/tasks');

// Initialize empty array to store tasks
let tasks = [];

app.use(express.json());

// // Mount the tasks router
// app.use('./tasks', tasksRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
  });

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
