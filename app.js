const cors = require("cors");
const express = require("express");
const app = express();
const {
  getAllTopics,
  getAllEndPoints,
} = require("./controllers/topics.controller.js");
const {
  getAllArticles,
  getArticleById,
  patchArticleByArticleId,
} = require("./controllers/articles.controller.js");
const {
  getCommentsByArticleId,
  postComment,
  removeCommentById,
} = require("./controllers/comments.controller.js");
const apiRouter = require("./routes/api-router.js")
const { getAllUsers } = require("./controllers/users.controller.js");

app.use(cors());

app.use(express.json());

app.use("/api", apiRouter);

// app.get("/api", getAllEndPoints); done

// app.get("/api/topics", getAllTopics); done

// app.get("/api/articles", getAllArticles); done

// app.get("/api/users", getAllUsers); done

// app.get("/api/articles/:article_id", getArticleById); done

// app.get("/api/articles/:article_id/comments", getCommentsByArticleId); done

// app.post("/api/articles/:article_id/comments", postComment); done

// app.patch("/api/articles/:article_id", patchArticleByArticleId); done

// app.delete("/api/comments/:comment_id", removeCommentById);


app.all("/*", (request, response, next) => {
  response.status(404).send({ msg: "not found" });
});

app.use((err, request, response, next) => {
  if (err.code === "22P02") {
    response.status(400).send({ msg: "bad request" });
  } else {
    next(err);
  }
});

app.use((err, request, response, next) => {
  if (err.code === "23503") {
 
    response.status(404).send({ msg: "not found" });
  } else {
    next(err);
  }
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
