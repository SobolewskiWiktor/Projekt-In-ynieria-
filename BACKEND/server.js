const express = require('express')
const cors = require('cors');
const util = require('util');

const app = express(); 

const mysql = require("mysql");
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Projekt12!',
    database: 'projekt'
  })

  module.exports = {con}
app.use(cors());
app.use(express.json());
app.use(
    express.urlencoded({
      extended: true,
    })
  );
let auth = 0; 

app.post('/login', (req,res) => {
    let login = '';
    let password = '';
    login = req.body.user.Login;
    password = req.body.user.Password
    let fromBase = ''; 
    con.query(`select password, type from WORKERS where login = '`+login+`'`, (err, result) => {
        if(err)
        {
          console.log("ERROR: "+ err)
        }
        else
        {
          console.log("Result: ")
          console.log(result);
          if(result == '')  
          {
            console.log("No accept")
            res.json({
                status: 'NO',
            })
          }
          else
          {
            if(result[0].password == password)
            {
                console.log("Accept")
                res.json({
                    Loginstatus: 'OK',
                    Loginlogin: login,
                    Type: result[0].type
                })
            }
          }
        }
    }); 
})

app.get("/getWorker", (req,res) => {
    let workers = []; 
    const query = `select * from WORKERS`;
    con.query( query, (err, result) =>
    {
        console.log("jestem w con")
        if(err)
        {
            console.log("ERROR", err)
        }
        else
        {
            result.forEach((elem, index, arr) => {
                console.log("dodaje: "+elem.login)
                workers[index] = elem.login;
            })
            res.json({
                Login: workers
            })
        }
    });
})

app.post("/addWorkerToBase", (req,res) => 
    {
        con.query(`INSERT INTO WORKERS (name, surname, login, password, type) VALUES (
            '`+req.body.newUser.Name+`',
            '`+req.body.newUser.Surname+`',
            '`+req.body.newUser.Login+`',
            '`+req.body.newUser.Password+`',
            '`+req.body.newUser.Type+`'
        )`, (err, result) => {
            if(err)
            {
                console.log("ERROR: "+err)
                res.json({AddStatus: 'NO'})
            }
            else
            {
                res.json({AddStatus: 'OK'})
            }

        })
    });

app.get('/getProject', (req,res) => {
    let projects = []; 
    con.query(`select * from TASKS`, (err, result) => {
        if(err)
        {
            console.log("ERROR ", err)
        }
        else
        {
            result.forEach((elem, index, arr) =>{
                projects[index] = elem.name;
            })
            res.json({
                projekt: projects, 
            })
        }
    })
})
app.post('/addProjectToBase',async  (req, res) => {
    let korrID = -1; 
    let result = await con.query(`SELECT id FROM WORKERS where login = '`+req.body.newProject.Koord+`'`, (err, result) => {
        if(err)
        {
            console.log(err)
            res.json({AddStatus: 'NO'})
        }
        else
        {
            korrID = result[0].id; 
        }
    
    let result2 = con.query(`INSERT INTO TASKS (name, coordynator, description) VALUES (
        '`+req.body.newProject.Name+`',
        '`+korrID+`',
        '`+req.body.newProject.Desc+`'
    )`, (err, result) => {
         if(err)
            {
                console.log("ERROR: "+err)
                res.json({AddStatus: 'NO'})
            }
            else
            {
                res.json({AddStatus: 'OK'})
            }

    })
    })
})
app.get('/getKoordID', (req,res) => {
    let login = req.body.koordynator.Login;
    con.query(`SELECT id FROM WORKERS where login = '`+login+`'`, (err,result) => {
        if(err)
        {
            console.log("ERROR: ", err)
        }
        else
        {
            res.json({KoordID: result[0].id})
        }
    })
})
let projectName = '';
app.post('/sendProjectName', (req,res) => {
    projectName = req.body.Project.Name;
    res.json({Status: 'OK'})
})
app.get('/getProjectName', (req,res) => {
    res.json({Name: projectName})
})
app.listen(300, () => {
    console.log('BACKEND | SERVER is listening on port 300');
});
