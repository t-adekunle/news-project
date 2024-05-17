const {
  selectCommentsByArticleId,
  insertComment,
  deleteCommentById,
  updateCommentById
} = require("../models/comments.model");
const { selectArticleById } = require("../models/articles.model");

const getCommentsByArticleId = (request, response, next) => {
  const article_id = request.params.article_id;
  const promises = [
    selectArticleById(article_id),
    selectCommentsByArticleId(article_id),
  ];

  Promise.all(promises)
    .then((promiseResolutions) => {
      const comments = promiseResolutions[1];
      response.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};

const postComment = (request, response, next) => {
  const article_id = request.params.article_id;
  const username = request.body.username;
  const body = request.body.body;

  insertComment(article_id, username, body)
    .then((comment) => {
      response.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};

const removeCommentById = (request, response, next) => {
  const comment_id = request.params.comment_id;
  

  deleteCommentById(comment_id)
    .then(() => {
      response.status(204).send({});
    })
    .catch((err) => {
      next(err);
    });
};

const patchCommentById = (request, response, next) => {
  const comment_id = request.params.comment_id
  const newVote = request.body.inc_votes


  updateCommentById(comment_id, newVote)
  .then((comment) => {
    response.status(200).send({comment})
  })
  .catch((err) => {
    next(err)
  })
  
}

module.exports = { getCommentsByArticleId, postComment, removeCommentById, patchCommentById };
