const { selectCommentsByArticleId } = require('../models/comments.model')
const { checkExists } = require('../utils.js')
const { selectArticleById } = require('../models/articles.model')

const getCommentsByArticleId = (request, response, next) => {
    article_id = request.params.article_id
    const promises = [checkExists('articles', 'article_id', article_id), selectCommentsByArticleId(article_id)]
    
   Promise.all(promises).then((promiseResolutions) => {
        const comments = promiseResolutions[1]
        response.status(200).send({comments})
    })
    .catch((err) => {
        console.log(err)
        next(err)
    })
}

/*
  selectCommentsByArticleId(article_id).then((comments) => {
        response.status(200).send({comments})
    })
    .catch((err) => {
        next(err)
    })*/ 

module.exports = { getCommentsByArticleId }