const {
  selectAllArticles,
  selectArticleById,
} = require("../models/articles.model");
const { countCommentsByArticleID } = require("../models/comments.model");

const getAllArticles = (request, response, next) => {
  selectAllArticles()
    .then((articles) => {
      const commentsPromises = articles.map((article) => {
        return countCommentsByArticleID(article.article_id).then((count) => {
          return count;
        });
      });

      Promise.all(commentsPromises)
        .then((promiseResolutions) => {
          const alteredArticles = articles.map((article) => {
            promiseResolutions.forEach((commentCount) => {
              article.comment_count = commentCount;
            });
            return article;
          });
          return alteredArticles;
        })
        .then((articles) => {
          response.status(200).send({ articles });
        });
    })
    .catch((err) => {
      next(err);
    });
};

const getArticleById = (request, response, next) => {
  const article_id = request.params.article_id;

  selectArticleById(article_id)
    .then((article) => {
      response.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { getAllArticles, getArticleById };
