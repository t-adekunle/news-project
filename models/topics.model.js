const format = require("pg-format");
const db = require("../db/connection.js");
const fs = require("fs/promises");

const selectAllTopics = () => {
  let sqlString = `SELECT * from topics`;
  return db.query(sqlString).then(({ rows }) => {
    return rows;
  });
};

const readAllEndPoints = () => {
  return fs
    .readFile(`${__dirname}/../endpoints.json`, "utf-8")
    .then((endpoints) => {
      const parsedEndPoints = JSON.parse(endpoints);
      return parsedEndPoints;
    });
};

module.exports = { selectAllTopics, readAllEndPoints };
