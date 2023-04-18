const mysql = require("mysql");
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Projekt12!',
    database: 'projekt'
  })

  module.exports = {con}