const {
  getAllArticles,
  getArticleById,
  patchArticleByArticleId,
} = require("../controllers/articles.controller");
const {
  getCommentsByArticleId,
  postComment,
} = require("../controllers/comments.controller");

const articlesRouter = require("express").Router();

articlesRouter.get("/", getAllArticles);

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticleByArticleId);


articlesRouter
.route("/:article_id/comments")
.get(getCommentsByArticleId)
.post(postComment)



module.exports = articlesRouter;
