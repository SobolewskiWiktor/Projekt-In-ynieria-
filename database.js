var mysql = require('mysql');
const con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password:"password",
    database: "database"
})

module.exports = con; 








