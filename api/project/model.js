// build your `Project` model here
const db = require("../../data/dbConfig");

// Retrieve all projects from the database
async function getProjects() {
  const projects = await db("projects");
  // Convert project_completed to a Boolean value
  return projects.map((project) => ({
    ...project,
    project_completed: Boolean(project.project_completed),
  }));
}

// Retrieve a project by its ID
async function getProjectById(project_id) {
  const project = await db("projects").where({ project_id }).first();
  return project
    ? {
        ...project,
        project_completed: Boolean(project.project_completed),
      }
    : null; // Return null if the project does not exist
}

// Create a new project in the database
async function createProject(project) {
  const [id] = await db("projects").insert(project);
  // Fetch and return the newly created project by its ID
  return getProjectById(id);
}

// Export the functions for use in other modules
module.exports = {
  getProjects,
  getProjectById,
  createProject,
};