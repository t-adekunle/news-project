const { removeCommentById } = require('../controllers/comments.controller')

const commentsRouter = require('express').Router()

commentsRouter.delete('/:comment_id', removeCommentById)

module.exports = commentsRouter