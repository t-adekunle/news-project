const format = require ('pg-format')
const db = require ('./db/connection.js')

const checkExists = (table, column, value) => {
    const queryString = format(`SELECT * FROM %I WHERE %I =$1;`, table, column);

    return db.query(queryString,[value]).then((result) => {
        if (result.rows.length === 0){
            return Promise.reject({status: 404, msg: 'not found'})
        }
    })
}

module.exports = { checkExists }