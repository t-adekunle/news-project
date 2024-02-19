const format = require ('pg-format')
const db = require ('../db/connection.js')


const selectAllTopics = () => {
let sqlString = `SELECT * from topics`
return db.query(sqlString).then(({rows}) => {
    if (rows.length === 0){
        return Promise.reject({status: 404, msg: 'path not found'})
    }
return rows
})
}

module.exports = { selectAllTopics }