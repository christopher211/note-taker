import express from "express";
import {
  readFromFile,
  readAndAppend,
  writeToFile,
} from "../helpers/fsUtils.js";

const recentlyDeteledRouter = express.Router();

recentlyDeteledRouter.get("/", (req, res) => {
  readFromFile("./db/db.json").then((data) => {
    console.log("data", JSON.parse(data));
    const notes = JSON.parse(data);
    const filteredNotes = notes.filter((note) => note.status === 0);
    res.json(filteredNotes);
  });
});

recentlyDeteledRouter.put("/:id", (req, res) => {
  const noteId = req.params.id;
  readFromFile("./db/db.json").then((data) => {
    const notes = JSON.parse(data);
    notes.forEach((note) => {
      if (note.id === noteId) {
        note.status = 1;
      }
    });

    writeToFile("./db/db.json", notes);
    res.json(notes);
  });
});

export default recentlyDeteledRouter;
