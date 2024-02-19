const express = require("express");
const app = express();
const {
  getAllTopics,
  getAllEndPoints,
} = require("./controllers/topics.controller.js");
const { getArticleById } = require('./controllers/articles.controller.js')

app.get("/api", getAllEndPoints);

app.get("/api/topics", getAllTopics);

app.get("/api/articles/:article_id", getArticleById);

app.all("/*", (request, response, next) => {
  response.status(404).send({ msg: "path not found" });
});

app.use((err, request, response, next) => {
  if (err.status && err.msg) {
    response.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

app.use((err, request, response, next) => {
  response.status(500).send({ msg: "Internal server error" });
});

module.exports = app;
