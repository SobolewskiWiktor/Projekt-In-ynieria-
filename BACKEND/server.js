const express = require('express')
const cors = require('cors');
const app = express(); 

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
    console.log("P: ", password, "L: ", login)
    if(password == 'test')
    {
        auth = 1;
    }
    else
    {
        auth = 0; 
    }
    if(auth == 1)
    {    
        console.log("accept")
        res.json({
            Loginstatus: 'OK',
            Loginlogin: 'test'
        })
    }
    else
    {
        console.log("No accept")
        res.json({
            status: 'NO',
        })
    }
})

app.get("/getWorker", (req,res) => {
    res.json({
        Login: ['maciek','mirek','henryk','seweryn','fizi','dragon','kamilek']
    })
})

app.get("/getProject", (req,res) => {
    res.json({
        projekt: ['Programowanie bazy', 'Napisanie backendu', 'Zrobienie fronta', 'Konfiguracja serwera prod.']
    })
})

app.listen(300, () => {
    console.log('BACKEND | SERVER is listening on port 300');
});
