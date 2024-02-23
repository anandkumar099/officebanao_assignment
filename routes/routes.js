const express = require("express");
const {
  createNote,
  updateNote,
  getNotes,
  deleteNote,
  uploadImage,
  createNotes,
} = require("../controllers/notes_controllers");
const validateTodo = require("../middlewares/validation");
const Router = express.Router();

Router.get("/create-note", createNote);
Router.post("/create-note", validateTodo.validateTodo, createNote);
Router.put("/update-note",validateTodo.validateTodoUpdate, updateNote);
Router.get("/get-notes", getNotes);
Router.delete("/delete-note/:id",validateTodo.validateTodoUpdate, deleteNote);
Router.put("/upload-image", uploadImage);
Router.post("/create-notes",validateTodo.validateTodoBulk, createNotes);

module.exports = Router;
