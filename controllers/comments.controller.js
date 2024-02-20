const { selectCommentsByArticleId } = require('../models/comments.model')

const getCommentsByArticleId = (request, response, next) => {
    article_id = request.params.article_id
    selectCommentsByArticleId(article_id).then((comments) => {
        response.status(200).send({comments})
    })
    .catch((err) => {
        next(err)
    })
}

module.exports = { getCommentsByArticleId }