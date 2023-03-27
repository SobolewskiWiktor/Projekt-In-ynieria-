const DB = require("../../database");
let taskName = [];
let userName = [];

DB.query(`SELECT * FROM users_task`, async (err, result) => {
  if (err) {
    console.log("ERROR", err);
  } else {
    result.forEach((elem, index, arr) => {
      taskName[index] = elem.nazwa_taska;
      userName[index] = elem.login_usera;
      console.log("dodaje: ",elem.login_user)
      console.log("tablica:", userName)
    });
  }
});

function refreshGet() {
    DB.query(`SELECT * FROM users_task`, async (err, result) => {
      if (err) {
        console.log("ERROR", err);
      } else {
        result.forEach((elem, index, arr) => {
          taskName[index] = elem.nazwa_taska;
          userName[index] = elem.login_usera;
          console.log("dodaje: ",elem.login_user)
          console.log("tablica:", userName)
        });
      }
    });
  }

  function AddTeam(user, task)
  {
    DB.query(
        `INSERT INTO users_task (nazwa_taska, login_usera) VALUES ('${task}','${user}')`
      );
  }

  function DeleteTeam(user,task)
  {
    DB.query(`DELETE FROM users_task where nazwa_taska = '${task}' AND login_usera = '${user}'`);
    console.log(`DELETE FROM users_task where nazwa_taska = '${task}' AND login_usera = '${user}'`)
  }

  function celarTables()
  {
    taskName = [];
    userName = [];
  }
  module.exports = {
    refreshGet,
    taskName,
    userName,
    AddTeam,
    DeleteTeam,
    celarTables
  };