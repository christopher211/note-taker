import express from "express";
import {
  readFromFile,
  readAndAppend,
  writeToFile,
} from "../helpers/fsUtils.js";

const notesRouter = express.Router();

notesRouter.get("/", (req, res) => {
  readFromFile("./db/db.json").then((data) => {
    console.log("data", JSON.parse(data));
    const notes = JSON.parse(data);
    const filteredNotes = notes.filter((note) => note.status === 1);
    res.json(filteredNotes);
  });
});

notesRouter.post("/", (req, res) => {
  const { title, text } = req.body;
  if (req.body) {
    const newNote = {
      title,
      text,
      id: Math.floor(Math.random() * 100000),
      status: 1,
    };

    readAndAppend(newNote, "./db/db.json");
    res.json(`Note added successfully 🚀`);
  } else {
    res.error("Error in adding note");
  }
});

notesRouter.delete("/:id", (req, res) => {
  const noteId = req.params.id;
  readFromFile("./db/db.json").then((data) => {
    const notes = JSON.parse(data);
    notes.forEach((note) => {
      if (note.id === noteId) {
        note.status = 0;
      }
    });

    writeToFile("./db/db.json", notes);
    res.json(notes);
  });
});

export default notesRouter;
