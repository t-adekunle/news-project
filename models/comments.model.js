const db = require("../db/connection.js");

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

module.exports = { selectCommentsByArticleId };


