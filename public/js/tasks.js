//import
const DB = require("../../database");

//variables
const tasks = [];
const status = [];
const desc = [];

//path
const addTask = (Task) => {
  tasks.push(Task);
};

//database
DB.connect(function (err) {
  if (err) {
    throw err;
  }
});

DB.query(`select * from tasks`, async (err, result) => {
  if (err) {
    console.log("ERROR", err);
  } else {
    result.forEach((elem, index, arr) => {
      tasks[index] = elem.nazwa;
      status[index] = elem.wykonanie;
      desc[index] = elem.opis;
    });
  }
});

function refresh() { 
  DB.query(`select * from tasks`, async (err, result) => {
    if (err) {
      console.log("ERROR", err);
    } else {
      result.forEach((elem, index, arr) => {
        tasks[index] = elem.nazwa;
        updateState(elem.nazwa);
        status[index] = elem.status;
        desc[index] = elem.opis;
      });
    }
  });
}

function add(name, targetDate, desc, user) {
  DB.query(
    `INSERT INTO tasks (nazwa, opis, data_zak, wykonanie, user) VALUES ('${name}','${desc}','${targetDate}','DO','${user}')`
  );
}

function deleteTask(name, status) {
  if ((status == "Done")) {
    DB.query(`DELETE FROM TASKS WHERE name=${name}`);
  }
}

function updateState(name) {
    DB.query(`SELECT * FROM assignments where task = '${name}'`, (err, result) => {
      if(err)
      {
        console.log("ERROR", err);
      }
      else
      {
        result.forEach((elem, idenx, add) => {
          if(elem.wykoanie == 'DONE')
          {
            DB.query(`UPDATE tasks wykonanie = 'INP' where nazwa = '${name}'`)
          }
        })
      }
    });
}
module.exports = {
  tasks,
  status,
  desc,
  add,
  deleteTask,
  refresh,
  updateState
};
