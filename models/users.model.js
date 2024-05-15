const db = require("../db/connection.js");

const selectAllUsers = () => {
    const sqlString = `SELECT * from users`;
    return db.query(sqlString).then(({ rows }) => {
      return rows;
    });

}

const selectUserByUsername = (username) => {
  const queryValues = []
  let sqlString = `SELECT * FROM users`

  if (username) {
    queryValues.push(username)
    sqlString += ` WHERE username = $1`
  }


  return db.query(sqlString, queryValues).then(({rows}) => {
    if (rows.length === 0 ){
      return Promise.reject({ status: 404, msg: "not found"})
    }
    return rows[0]
  })
}


module.exports = { selectAllUsers, selectUserByUsername}