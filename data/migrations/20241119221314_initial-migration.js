/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable("projects", (table) => {
      table.increments("project_id"); // Primary key
      table.string("project_name", 128).notNullable(); // Project name
      table.string("project_description", 255); // Optional project description
      table.boolean("project_completed").defaultTo(false); // Completion status
    })
    .createTable("resources", (table) => {
      table.increments("resource_id"); // Primary key
      table.string("resource_name", 128).notNullable().unique(); // Resource name must be unique
      table.string("resource_description", 255); // Optional resource description
    })
    .createTable("tasks", (table) => {
      table.increments("task_id"); // Primary key
      table.string("task_description", 255).notNullable(); // Task description
      table.string("task_notes", 255); // Optional task notes
      table.boolean("task_completed").defaultTo(false); // Completion status
      table
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("project_id")
        .inTable("projects")
        .onDelete("CASCADE") // Deletes tasks if the associated project is deleted
        .onUpdate("CASCADE"); // Updates project_id if it changes
    })
    .createTable("project_resources", (table) => {
      table.increments("id"); // Primary key
      table
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("project_id")
        .inTable("projects")
        .onDelete("CASCADE")
        .onUpdate("CASCADE"); // Reference to project_id
      table
        .integer("resource_id")
        .unsigned()
        .notNullable()
        .references("resource_id")
        .inTable("resources")
        .onDelete("CASCADE")
        .onUpdate("CASCADE"); // Reference to resource_id
      table.unique(["project_id", "resource_id"]); // Ensures no duplicate assignments
    });  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists("project_resources") // Drop the project_resources table if it exists
    .dropTableIfExists("tasks") // Drop the tasks table if it exists
    .dropTableIfExists("resources") // Drop the resources table if it exists
    .dropTableIfExists("projects"); // Drop the projects table if it exists  
};
