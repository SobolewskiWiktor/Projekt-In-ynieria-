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
    con.query(`select haslo, typ from WORKERS where login = '`+login+`'`, (err, result) => {
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
            if(result[0].haslo == password)
            {
                console.log("Accept")
                res.json({
                    Loginstatus: 'OK',
                    Loginlogin: login,
                    Type: result[0].typ
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
                console.log("dodaje: "+elem.imie)
                workers[index] = elem.imie;
            })
            res.json({
                Login: workers
            })
        }
    });
})

app.post("/addWorkerToBase", (req,res) => 
    {
        con.query(`INSERT INTO WORKERS (imie, nazwisko, login, haslo, typ) VALUES (
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

app.get('getProject', (req,res) => {
    res.json({
        projekt: ['Programowanie bazy', 'Napisanie backendu', 'Zrobienie fronta', 'Konfiguracja serwera prod.']
    })
})

app.listen(300, () => {
    console.log('BACKEND | SERVER is listening on port 300');
});
