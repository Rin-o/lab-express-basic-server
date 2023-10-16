const express = require("express");
const morgan = require("morgan");
const path = require("path");
const fs = require("fs");
const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(morgan("dev"));
const articlesPath = path.join(__dirname, "data", "articles.json");
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "home.html"));
});
app.get("/blog", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "blog.html"));
});
app.get("/api/projects", (req, res) => {
  fs.readFile(path.join(__dirname, "data", "projects.json"), "utf8", (err, data) => {
    if (err) {
      console.error("Error reading projects file:", err);
      res.status(500).send("Internal Server Error");
    } else {
      const projects = JSON.parse(data);
      res.json(projects);
    }
  });
});
app.get("/api/articles", (req, res) => {
  fs.readFile(articlesPath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading articles file:", err);
      res.status(500).send("Internal Server Error");
    } else {
      const articles = JSON.parse(data);
      res.json(articles);
    }
  });
});
app.get("/api/projects", (req, res) => {
    res.json(projects)
})
app.get("/api/articles", (req, res) => {
    res.json(articles)
})
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views", "not-found.html"));
});
const port = 5004;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});