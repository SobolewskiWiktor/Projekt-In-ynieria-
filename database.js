var mysql = require('mysql');
const con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password:"Projekt12!",
    database: "projekt"
})

module.exports = con; 








