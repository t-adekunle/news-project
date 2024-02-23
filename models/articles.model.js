const db = require("../db/connection.js");


const selectAllArticles = (topic, sort_by = "created_at", order = "desc") => {
  const validSortBy = ['title', 'topic' , 'author', 'body', 'created_at', 'votes', 'comment_count']
  const validOrder = ["asc", "desc"]
  const queries = [];
  let sqlString = `SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.body) AS comment_count FROM articles 
  LEFT JOIN comments ON comments.article_id=articles.article_id`;

  if (!validSortBy.includes(sort_by) || !validOrder.includes(order)){
    return Promise.reject({status:400, msg: "bad request"})
  }
  if (topic) {
      queries.push(topic);
      sqlString += ` WHERE topic = $1`;
  
  }
  sqlString += ` GROUP BY articles.article_id`;


  
  sqlString += ` ORDER BY ${sort_by} ${order}`;
 
  return db.query(sqlString, queries).then(({ rows }) => {
    return rows;
  });
};

const selectArticleById = (article_id) => {
  const queryValues = [];
  let sqlString = `SELECT articles.*, COUNT(comments.article_id) AS comment_count 
  FROM articles 
  LEFT JOIN comments ON comments.article_id=articles.article_id`;

  if (article_id) {
    queryValues.push(article_id);
    sqlString += ` WHERE articles.article_id = $1`;
  }

  sqlString += ` GROUP BY articles.article_id`

  return db.query(sqlString, queryValues).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({ status: 404, msg: "not found" });
    }
    return rows[0];
  });
};

const updateArticleByArticleId = (article_id, newVote) => {
  const queryValues = [];
  let sqlString = `UPDATE articles
  SET votes = votes`;

  if (!newVote || typeof newVote != "number") {
    return Promise.reject({ status: 400, msg: "bad request" });
  }

  if (newVote >= 0) {
    queryValues.push(newVote);
    queryValues.push(article_id);
    sqlString += ` + $1`;
  } else if (newVote < 0) {
    const updatedVote = newVote.toString().slice(1);
    queryValues.push(updatedVote);
    queryValues.push(article_id);
    sqlString += ` - $1`;
  }

  sqlString += ` WHERE article_id = $2
  RETURNING *;`;

  return db.query(sqlString, queryValues).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({ status: 404, msg: "not found" });
    }
    return rows[0];
  });
};
module.exports = {
  selectAllArticles,
  selectArticleById,
  updateArticleByArticleId,
};
