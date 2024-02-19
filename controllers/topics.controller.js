const {
  selectAllTopics,
  readAllEndPoints,
} = require("../models/topics.model.js");

const getAllTopics = (request, response, next) => {
  selectAllTopics()
    .then((topics) => {
      response.status(200).send({ topics });
    })
    .catch((err) => {
      next(err);
    });
};

const getAllEndPoints = (request, response, next) => {
  readAllEndPoints()
    .then((endpoints) => {
      response.status(200).send({ endpoints });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { getAllTopics, getAllEndPoints };
