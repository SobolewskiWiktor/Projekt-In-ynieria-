const DB = require("../../database");
const taskName = [];
const userName = [];

function refreshGet() {
    DB.query(`SELECT * FROM users_task`, async (err, result) => {
      if (err) {
        console.log("ERROR", err);
      } else {
        result.forEach((elem, index, arr) => {
          taskName[index] = elem.nazwa_taska;
          userName[index] = elem.login_user;
        });
      }
    });
  }

  module.exports = {
    refreshGet,
    taskName,
    userName
  };