// build your `/api/tasks` router here
const express = require("express");
const Tasks = require("../task/model");

const router = express.Router();

// GET endpoint to retrieve all tasks
router.get("/", async (req, res, next) => {
  try {
    const tasks = await Tasks.getTasks();
    res.json(tasks); // Send the list of tasks as a JSON response
  } catch (err) {
    next(err); // Pass any errors to the error handling middleware
  }
});

// POST endpoint to create a new task
router.post("/", async (req, res, next) => {
  try {
    const { task_description, project_id } = req.body;

    // Validate that task_description and project_id are provided
    if (!task_description || !project_id) {
      return res.status(400).json({
        message: "Task description and project ID are required",
      });
    }

    const newTask = await Tasks.createTask(req.body);
    res.status(201).json(newTask); // Send the created task as a JSON response
  } catch (err) {
    next(err); // Pass any errors to the error handling middleware
  }
});

// Export the router for use in the main application
module.exports = router;