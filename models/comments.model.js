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

const insertComment = (
  article_id,
  username,
  body,
  votes = 0,
  created_at = Date.now()
) => {
  const alteredDate = new Date(created_at);

  const sqlQuery = `INSERT INTO comments (article_id, author, body, votes, created_at)
                    VALUES ($1, $2, $3, $4, $5)
                    RETURNING *`;
  if (!username || !body) {
    return Promise.reject({ status: 400, msg: "bad request" });
  }

  return db
    .query(sqlQuery, [article_id, username, body, votes, alteredDate])
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "not found" });
      }
      return result.rows[0];
    });
};

const deleteCommentById = (comment_id) => {
  let sqlQuery = `DELETE FROM comments`;

  if (!comment_id) {
    return Promise.reject({ status: 400, msg: "bad request" });
  }

  sqlQuery += ` WHERE comment_id = $1 RETURNING *`;

  return db.query(sqlQuery, [comment_id]).then((result) => {
    if (result.rows.length === 0) {
      return Promise.reject({ status: 404, msg: "not found" });
    }
    return result.rows[0];
  });
};

module.exports = {
  selectCommentsByArticleId,
  insertComment,
  deleteCommentById,
};
