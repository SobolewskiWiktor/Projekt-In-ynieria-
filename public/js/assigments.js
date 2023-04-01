const DB = require("../../database");
const Assignment =  [];

function getAssgiments () 
{
    DB.query(`SELECT * FROM assignments`, (err, result) => {
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
    console.log("daje update assinment")
    DB.query(`UPDATE assignments SET wykonanie = 'DONE', wykonujacy = '${person}' WHERE nazwa = '${assignment}' AND task = '${name}' `);
    console.log(`UPDATE assignments SET wykonanie = 'DONE', wykonujacy = '${person}' WHERE nazwa = '${assignment}' AND task = '${name}'`)
}

module.exports = {
  Assignment,
  addAssigments,
  UpdateAssigments,
  getAssgiments 
}