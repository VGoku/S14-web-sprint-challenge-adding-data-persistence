// build your `Resource` model here
const db = require("../../data/dbConfig");

// Retrieve all resources from the database
async function getResources() {
  return db("resources"); // Return all resources
}

// Retrieve a resource by its ID
async function getResourceById(resource_id) {
  return db("resources").where({ resource_id }).first(); // Return the first matching resource
}

// Create a new resource in the database
async function createResource(resource) {
  const [id] = await db("resources").insert(resource); // Insert the new resource and get its ID
  return getResourceById(id); // Fetch and return the newly created resource by its ID
}

// Export the functions for use in other modules
module.exports = {
  getResources,
  getResourceById,
  createResource,
};