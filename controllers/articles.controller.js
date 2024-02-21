const {
  selectAllArticles,
  selectArticleById,
} = require("../models/articles.model");

const getAllArticles = (request, response, next) => {
  selectAllArticles()
    .then((articles) => {
      response.status(200).send({ articles });
    })
    .catch((err) => {
      console.log(err);
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
