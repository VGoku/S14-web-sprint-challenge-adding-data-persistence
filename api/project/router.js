// build your `/api/projects` router here
const express = require("express");
const Projects = require("../project/model");

const router = express.Router();

// GET endpoint to retrieve all projects
router.get("/", async (req, res, next) => {
  try {
    const projects = await Projects.getProjects();
    res.json(projects); // Send the list of projects as a JSON response
  } catch (err) {
    next(err); // Pass any errors to the error handling middleware
  }
});

// POST endpoint to create a new project
router.post("/", async (req, res, next) => {
  try {
    const { project_name } = req.body;

    // Validate that project_name is provided
    if (!project_name) {
      return res.status(400).json({ message: "Project name is required" });
    }

    const newProject = await Projects.createProject(req.body);
    res.status(201).json(newProject); // Send the created project as a JSON response
  } catch (err) {
    next(err); // Pass any errors to the error handling middleware
  }
});

// Export the router for use in the main application
module.exports = router;