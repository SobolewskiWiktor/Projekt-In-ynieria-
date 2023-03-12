//import
const DB = require ('../../database');

//variables
const tasks = []; 
const status = [];
const desc = []; 

//path 
const addTask = (Task) => {
  tasks.push(Task);
}

//database
DB.connect(function (err) 
{
    if(err)
    {
        throw err;
    }
})

DB.query(`select * from tasks`,
   async(err, result) => 
   {
     if(err)
     {
        console.log("ERROR", err);
     }
     else
     {
      result.forEach((elem, index, arr) => {
         tasks[index] = elem.nazwa
         status[index] = elem.wykonanie
         desc[index] = elem.opis 
      })
     }
   });

function refresh () {
   
  DB.query(`select * from tasks`,
    async(err, result) => 
    {
      if(err)
      {
        console.log("ERROR", err);
      }
      else
      {
        result.forEach((elem, index, arr) => {
          tasks[index] = elem.nazwa
          status[index] = elem.wykonanie
          desc[index] = elem.opis
        }
        )
      }
    }
  )
};

function add (name, status, desc)
{
  DB.query(`INSERT INTO TASKS (nazwa,status,opis) VALUES ${name},${status},${desc}`)
}

function deleteTask (name,status)
{
  if(status = "Done")
  {
    DB.query(`DELETE FROM TASKS WHERE name=${name}`)
  }
}
module.exports={
    tasks,
    status,
    desc

}
