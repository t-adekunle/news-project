
const {
  selectAllArticles,
  selectArticleById,
  updateArticleByArticleId
} = require("../models/articles.model")



const getAllArticles = (request, response, next) => {
  
  const topic = request.query.topic


  selectAllArticles(topic)
    .then((articles) => {
      response.status(200).send({ articles });
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

const patchArticleByArticleId = (request, response, next) => {
const article_id = request.params.article_id
const newVote = request.body.inc_votes

  updateArticleByArticleId(article_id, newVote).then((article) => {
    response.status(200).send({ article })
  })
  .catch((err) => {
    next(err)
  })
}
module.exports = { getAllArticles, getArticleById, patchArticleByArticleId };
