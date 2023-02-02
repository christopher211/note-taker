import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { clog } from "./middleware/clog.js";
import appApi from "./routes/index.js";

const PORT = process.env.PORT || 3001;

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Import custom middleware, "cLog"
app.use(clog);

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", appApi);

app.use(
  // express.static("public"),
  express.static(path.resolve(__dirname, "public"), {
    extensions: ["js"],
  })
);

// GET Route for homepage
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

// GET Route for feedback page
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/pages/notes.html"))
);

app.get("/recently-deleted", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/pages/recently-deleted.html"))
);

// Wildcard route to direct users to a 404 page
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "public/pages/404.html"))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
