// Import required modules
// app.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Task = require('./Models/Job');
const compression = require('compression');


const app = express();
const port = 3000 || process.env.PORT; // You can change this port as per your preference

// Middleware

app.use(compression());

app.use(bodyParser.json());
app.use(cors());




// Connect to MongoDB
mongoose.connect('mongodb+srv://srbhmodanwal:Saurabh08@cluster0.fsc50ni.mongodb.net/', {
  useNewUrlParser:  true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB ');
}).catch((err) => {
  console.error('Error connecting to MongoDB: ', err);
});


app.get("/",(req,res)=>{
    res.send("Server is running smoothly")
})

app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
   
    
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).json({ error: 'An error occurred while fetching tasks' });
  }
});


// POST endpoint to add a new task
app.post('/api/tasks', async (req, res) => {
  const newTask = req.body;
  try {
    const task = await Task.create(newTask);
    res.status(201).json(task);
    console.log("koo");
  } catch (err) {
    console.error('Error creating task:', err);
    res.status(500).json({ error: 'An error occurred while creating a new task' });
  }
});

// PUT endpoint to update a task's status
app.put('/api/tasks/:taskId', async (req, res) => {
 

  const taskId = req.params.taskId;
  
  const updatedTask = req.body;
  try {
    const task = await Task.findByIdAndUpdate(taskId, updatedTask, { new: true });
    res.json(task);
  } catch (err) {
    console.error('Error updating task:', err);
    res.status(500).json({ error: 'An error occurred while updating the task' });
  }
});

// DELETE endpoint to delete a task
app.delete('/api/tasks/:taskId', async (req, res) => {
  const taskId = req.params.taskId;
  try {
    await Task.findByIdAndRemove(taskId);

    res.sendStatus(204);
  } catch (err) {
    console.error('Error deleting task:', err);
    res.status(500).json({ error: 'An error occurred while deleting the task' });
  }
});

// CSV export endpoint
// (To be implemented later)

// Start the server
app.listen(port, () => {
  console.log(`Server  running on port ${port}`);
});
