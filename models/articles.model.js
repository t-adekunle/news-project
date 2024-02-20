const db = require("../db/connection.js");
const fs = require("fs/promises");

const selectAllArticles = () => {
  let sqlString = `SELECT * from articles`;
  sqlString += ` ORDER BY created_at DESC`;
  return db.query(sqlString).then(({ rows }) => {
    return rows;
  });
};

const selectArticleById = (article_id) => {
  const queryValues = [];
  let sqlString = `SELECT * FROM articles`;

  if (article_id) {
    queryValues.push(article_id);
    sqlString += ` WHERE article_id = $1`;
  }

  return db.query(sqlString, queryValues).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({ status: 404, msg: "not found" });
    }
    return rows[0];
  });
};

module.exports = { selectAllArticles, selectArticleById };
