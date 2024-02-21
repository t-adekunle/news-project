const db = require("../db/connection.js");

const selectCommentsByArticleId = (article_id) => {
  let sqlQuery = `SELECT * FROM comments`;
  const queries = [];

  if (article_id) {
    queries.push(article_id);
    sqlQuery += ` WHERE article_id = $1`;
  }
  sqlQuery += ` ORDER BY created_at DESC`;

  return db.query(sqlQuery, queries).then((results) => {
    return results.rows;
  });
};

const insertComment = (article_id, username, body) => {
console.log('hello from model')

  
  const sqlQuery = `INSERT INTO comments (article_id, author, body)
                    VALUES ($1, $2, $3)
                    RETURNING *`;

  return db.query(sqlQuery, [article_id, username, body])

  .then((result) => {
    return result.rows[0]
  })
};

module.exports = { selectCommentsByArticleId, insertComment };
