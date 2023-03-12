//import
const { builtinModules } = require("module");
const DB = require("../../database");
const usersName = [];
const usersSurname = [];
const usersLogin = [];
const usersStatus = [];

function refreshGet() {
  DB.query(`SELECT * FROM users`, async (err, result) => {
    if (err) {
      console.log("ERROR", err);
    } else {
      result.forEach((elem, index, arr) => {
        usersName[index] = elem.imie;
        usersSurname[index] = elem.nazwisko;
        usersLogin[index] = elem.login;
        usersStatus[index] = elem.status;
      });
    }
  });
}
refreshGet();

function addAdmin(name, surname, login, status, password) {
  DB.query(
    `INSERT INTO users (imie, nazwisko, login, status) VALUES ('${name}', '${surname}', /'${login}', '${status}')`
  );
  DB.query(
    `INSERT INTO logins (login, haslo, typ) VALUES ('${login}', '${password}', 'Admin') `
  );
}
function addUser(name, surname, login, status, password) {
  DB.query(
    `INSERT INTO users (imie, nazwisko, login, status) VALUES ('${name}', '${surname}', '${login}', '${status}')`
  );
  DB.query(
    `INSERT INTO logins (login, haslo, typ) VALUES ('${login}', '${password}','User') `
  );
}

module.exports = {
  refreshGet,
  addAdmin,
  addUser,
  usersName,
  usersSurname,
  usersLogin,
  usersStatus,
};
