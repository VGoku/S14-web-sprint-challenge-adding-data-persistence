// build your `/api/resources` router here
const express = require("express");
const Resources = require("../resource/model");

const router = express.Router();

// GET endpoint to retrieve all resources
router.get("/", async (req, res, next) => {
  try {
    const resources = await Resources.getResources();
    res.json(resources); // Send the list of resources as a JSON response
  } catch (err) {
    next(err); // Pass any errors to the error handling middleware
  }
});

// POST endpoint to create a new resource
router.post("/", async (req, res, next) => {
  try {
    const { resource_name } = req.body;

    // Validate that resource_name is provided
    if (!resource_name) {
      return res.status(400).json({ message: "Resource name is required" });
    }

    const newResource = await Resources.createResource(req.body);
    res.status(201).json(newResource); // Send the created resource as a JSON response
  } catch (err) {
    next(err); // Pass any errors to the error handling middleware
  }
});

// Export the router for use in the main application
module.exports = router;