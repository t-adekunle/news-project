const db = require("../db/connection.js");

const selectAllUsers = () => {
    const sqlString = `SELECT * from users`;
    return db.query(sqlString).then(({ rows }) => {
      return rows;
    });

}

module.exports = { selectAllUsers }