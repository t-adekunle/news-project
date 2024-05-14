const { getAllEndPoints } = require('../controllers/topics.controller')
const articlesRouter = require('./articles-router')
const commentsRouter = require('./comments-router')
const topicsRouter = require('./topics-router')
const usersRouter = require('./users-router')

const apiRouter = require('express').Router()

apiRouter.get('/', getAllEndPoints)

apiRouter.use('/topics', topicsRouter)

apiRouter.use('/articles', articlesRouter)

apiRouter.use('/users', usersRouter)

apiRouter.use('/comments', commentsRouter)

module.exports = apiRouter