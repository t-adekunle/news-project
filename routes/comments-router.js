const { removeCommentById, patchCommentById } = require('../controllers/comments.controller')


const commentsRouter = require('express').Router()

commentsRouter
.route("/:comment_id")
.delete(removeCommentById)
.patch(patchCommentById)


module.exports = commentsRouter