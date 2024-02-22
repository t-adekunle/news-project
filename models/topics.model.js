const db = require("../db/connection.js");
const fs = require("fs/promises");

const selectAllTopics = () => {
  const sqlString = `SELECT * from topics`;
  return db.query(sqlString).then(({ rows }) => {
    return rows;
  });
};

const selectTopicByName = (topic_name) => {
  const queryValues = []
  let sqlString = `SELECT * FROM topics`;
  
  if(topic_name){
    queryValues.push(topic_name)
    sqlString += ` WHERE slug = $1`
  }
  
  return db.query(sqlString, queryValues).then(({rows}) => {
    if (rows.length === 0) {
      return Promise.reject({ status: 404, msg: "not found" });
    }
    return rows[0];
  })
  }

const readAllEndPoints = () => {
  return fs
    .readFile(`${__dirname}/../endpoints.json`, "utf-8")
    .then((endpoints) => {
      const parsedEndPoints = JSON.parse(endpoints);
      return parsedEndPoints;
    });
};

module.exports = { selectAllTopics, readAllEndPoints, selectTopicByName };
