const format = require ('pg-format')
const db = require ('../db/connection.js')
const fs = require('fs/promises')

const selectAllTopics = () => {
let sqlString = `SELECT * from topics`
return db.query(sqlString).then(({rows}) => {
    return rows})
    }


module.exports = { selectAllTopics }