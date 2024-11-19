// build your `Task` model here
const db = require("../../data/dbConfig");

// Retrieve all tasks along with their associated project details
async function getTasks() {
  const tasks = await db("tasks as t")
    .join("projects as p", "t.project_id", "p.project_id")
    .select(
      "t.task_id",
      "t.task_description",
      "t.task_notes",
      "t.task_completed",
      "p.project_name",
      "p.project_description"
    );

  // Convert task_completed to a Boolean value
  return tasks.map((task) => ({
    ...task,
    task_completed: Boolean(task.task_completed),
  }));
}

// Retrieve a task by its ID
async function getTaskById(task_id) {
  const task = await db("tasks").where({ task_id }).first();
  return task
    ? { ...task, task_completed: Boolean(task.task_completed) }
    : null; // Return null if the task does not exist
}

// Create a new task in the database
async function createTask(task) {
  const [id] = await db("tasks").insert(task); // Insert the new task and get its ID
  return getTaskById(id); // Fetch and return the newly created task by its ID
}

// Export the functions for use in other modules
module.exports = {
  getTasks,
  getTaskById,
  createTask,
};