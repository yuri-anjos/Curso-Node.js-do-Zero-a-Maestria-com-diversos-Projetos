const mysql = require('mysql')

const pool = mysql.createPool({
    connectionLimit: 10,
    port: 3306,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'node_mysql',
})

exports.pool = pool