// build your server here and require it from index.js
const express = require("express");

// Import routers
const projectRouter = require("./project/router");
const resourceRouter = require("./resource/router");
const taskRouter = require("./task/router");

const server = express();

// Middleware
server.use(express.json());

// Routes
server.use("/api/projects", projectRouter);
server.use("/api/resources", resourceRouter);
server.use("/api/tasks", taskRouter);

// Error handling middleware
server.use((err, req, res, next) => { // eslint-disable-line
  console.error(err); // Log error for debugging
  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
  });
});

module.exports = server;