const { selectAllUsers } = require('../models/users.model.js')
const { selectUserByUsername } = require('../models/users.model.js')

const getAllUsers = (request, response, next) => {
    selectAllUsers()
    .then((users) => {
      response.status(200).send({ users });
    })
    .catch((err) => {
      next(err);
    });
}

const getUserByUsername = (request, response, next) => {


  const username = request.params.username

  selectUserByUsername(username)
  .then((user) => {
    
    response.status(200).send({user})
  })
  .catch((err) => {
    next(err)
  })
}

module.exports = { getAllUsers, getUserByUsername }