const db = require("../db/connection.js");
const fs = require("fs/promises");

const countCommentsByArticleID = (article_id) => {

  let sqlQuery = `SELECT * FROM comments`;
  const queries = [];

  if (article_id) {
    queries.push(article_id);
    sqlQuery += ` WHERE article_id = $1`;
  }

  return db.query(sqlQuery, queries).then((results) => {
    if (results.rows.length === 0) {
      return Promise.reject({ status: 404, msg: "not found" });
    }
    return results.rows.length;
  }).catch((err) => {
    return 0
  })
};

const selectCommentsByArticleId = (article_id) => {

  let sqlQuery = `SELECT * FROM comments`;
  const queries = [];

  if (article_id) {
    queries.push(article_id);
    sqlQuery += ` WHERE article_id = $1`;
  }
  sqlQuery += ` ORDER BY created_at DESC`
  
  return db.query(sqlQuery, queries).then((results) => {
    return results.rows;
})
}

module.exports = { countCommentsByArticleID, selectCommentsByArticleId };


