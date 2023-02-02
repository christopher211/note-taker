import express from "express";

// Import our modular routers for /tips and /feedback
import notesRouter from "./notes.js";
import recentlyDeteledRouter from "./recently-deleted.js";

const appApi = express();

appApi.use("/notes", notesRouter);
appApi.use("/recently-deleted", recentlyDeteledRouter);

export default appApi;
