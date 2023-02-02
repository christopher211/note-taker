import express from "express";

// Import our modular routers for /tips and /feedback
import notesRouter from "./notes.js";

const appApi = express();

appApi.use("/notes", notesRouter);

export default appApi;
