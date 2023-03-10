//import
const DB = require ('../../database');

//variables
const tasks = []; 

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
        let i = 0; 
        while(result[i])
        {
            tasks[i] = result[i].nazwa;
            i++;
        }
     }
   });



module.exports={
    tasks,

}
