const { selectAllUsers } = require('../models/users.model.js')

const getAllUsers = (request, response, next) => {
    selectAllUsers()
    .then((users) => {
      response.status(200).send({ users });
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = { getAllUsers }