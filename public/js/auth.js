const DB = require("../../database");

const logins = [];
const passwords = [];

let auth = "false";

function authorization(login, password) {
  DB.query(`select * from logins`, async (err, result) => {
    if (err) {
      console.log("ERROR", err);
    } else {
      result.forEach((elem, index, arr) => {
        logins[index] = elem.login;
        passwords[index] = elem.haslo;
      });
    }
  });
  logins.forEach((elem, index, arr) => {
    console.log("check L", elem.login, " pass: ", password[index]);
    if (elem.login == login && passwords[index] == password) {
      return true;
    }
  });
}

module.exports = { authorization, auth, logins, passwords };
