const DB = require("../../database");
const Assignment =  [];

function getAssgiments () 
{
    DB.query(`SELECT * FROM assignments where wykonanie = "NO" `, (err, result) => {
        if(err)
        {
            console.log("ERROR", err);
        }
        else
        {
            result.forEach((elem, index, arr) =>{
                  Assignment[index] = elem; 
            }); 
            console.log(Assignment)
        }
    });
}
getAssgiments();

function addAssigments(name, assignment)
{
    DB.query(`INSERT INTO assignments (nazwa, task) VALUES ('${assignment}', '${name}')`)
}

function UpdateAssigments(person, name, assignment)
{
    DB.query(`UPDATE assignments VALUE wykonanie = 'DONE', wykonujacy = '${person}' WHERE nazwa = '${assignment}' AND task = '${name}' `);
}

module.exports = {
  Assignment,
  addAssigments,
  UpdateAssigments,
  getAssgiments 
}