const db = require("../db/connection.js");
const fs = require("fs/promises");

const selectArticleById = (article_id) => {
  const queryValues = [];
  let sqlString = `SELECT * FROM articles`;

  if (article_id) {
    queryValues.push(article_id);
    sqlString += ` WHERE article_id = $1`;
  }

  return db.query(sqlString, queryValues).then(({ rows }) => {
    return rows[0];
  });
};

/* next in function, add error handling*/

module.exports = { selectArticleById };
