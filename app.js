// Importing modules
const express = require("express");
const log = require("./database.js");
const TASKS = require("./public/js/tasks");
const USER = require("./public/js/user");
const TEAM = require("./public/js/team");
const ASSIG = require("./public/js/assigments");
const e = require("express");
let LOGGIN = '0'; 
let LogginName = ""; 
// Variables
const PORT = 80;
let role = "";

// Main APP
const app = express();

// Modules
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");

// Routing
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/html/login_screen.html");
});

  app.get("/dashboard_user.html", (req, res) => {
    if(LOGGIN == '1')
    {
      const viewsTasks = {
        tasks: TASKS.tasks,
        status: TASKS.status,
        description: TASKS.desc,
      };
      res.render("dashboard_user", viewsTasks);
    }
    else
    {
      res.sendFile(__dirname + "/public/html/errorLogin.html")
    }
  });

  app.get("/dashboard_admin.html", (req, res) => {
    if(LOGGIN == '1')
    {
      const viewsUsers = {
        Name: USER.usersName,
        Surname: USER.usersSurname,
        Login: USER.usersLogin,
        Status: USER.usersStatus,
        Ref: USER.refreshGet,
      };
      res.render("dashboard_admin", viewsUsers);
    }
    else
    {
      res.sendFile(__dirname + "/public/html/errorLogin.html")
    }
  });

  //logins
  app.get("/loading_adm", (req, res) => {
    if(LOGGIN == '1')
    {
    res.sendFile(__dirname + "/public/html/loading_admin.html");
    }
    else
    {
      res.sendFile(__dirname + "/public/html/errorLogin.html")
    }
  });
  app.get("/loading_usr", (req, res) => {
    if(LOGGIN == '1')
    {
    res.sendFile(__dirname + "/public/html/loading_user.html");
    }
    else
    {
      res.sendFile(__dirname + "/public/html/errorLogin.html")
    }
  });

  //users
  app.get("/adminAddUser", (req, res) => {
    if(LOGGIN == '1')
    {
      res.render("addUser");
    }
    else
    {
      res.sendFile(__dirname + "/public/html/errorLogin.html")
    }
  });

  //tasks
  app.get("/addTask", (req, res) => {
    if(LOGGIN == '1')
    {
      res.render("addTask");
    }
    else
    {
      res.sendFile(__dirname + "/public/html/errorLogin.html")
    }
  });
  app.get("/showTask", (req, res) => {
    if(LOGGIN == 1)
    {
      const viewsTasksAdm = {
        tasks: TASKS.tasks,
        status: TASKS.status,
        description: TASKS.desc,
      };
      res.render("showTask", viewsTasksAdm);
    }
    else
    {
      res.sendFile(__dirname + "/public/html/errorLogin.html")
    }

  });

// Paths
app.post("/login", async (req, res) => {
  const userPassword = req.body.password;
  const userLogin = req.body.username;
  const login = (userLogin, userPassword) => {
    let userlogin = userLogin;
    let userpass = userPassword;
    if (userlogin != "" && userpass != "") {
      log.query(
        `select * from logins where login = ? and haslo = ?`,
        [userlogin, userpass],
        async (err, result) => {
          if (err) {
            console.log("ERROR", err);
          } else {
            if (result[0].haslo == userpass && result[0].login == userlogin) {
              console.log("loggin accepted");
              LOGGIN = '1'; 
              LogginName = result[0].login; 
              console.log("Zalogowano: ", LogginName);
              console.log("ROLA: ", result[0].typ);
              console.log("LOGGIN: ",LOGGIN)
              if (result[0].typ == "Admin") {
                console.log("przenosze na adm");
                res.redirect("/loading_adm");
              } else {
                res.redirect("/loading_usr");
              }
            }
          }
        }
      );
    }
  };
  login(userLogin, userPassword);
});


// tasks manament 
  app.post("/addUser", async (req, res) => {
    if(LOGGIN == '1')
    {
      console.log("start user adding section");
      const Name = req.body.first_name;
      const Surname = req.body.lastname;
      const Login = req.body.username;
      const Password = req.body.password;
      const Role = req.body.role;
      if (Role == "Admin") {
        USER.addAdmin(Name, Surname, Login, "Active", Password);
      } else if (Role == "User") {
        USER.addUser(Name, Surname, Login, "Active", Password);
      }
      USER.refreshGet();
      res.redirect("/loading_adm");
    } 
    else
    {
      res.sendFile(__dirname + "/public/html/errorLogin.html")
    }
  });


  app.post("/addTask", async (req, res) => {
    if(LOGGIN == '1')
    {
      const Name = req.body.name;
      const TargetDate = req.body.target_date;
      const Desc = req.body.desc;
      const User = req.body.userlog;

      TASKS.add(Name, TargetDate, Desc, User);
      TASKS.refresh();
      res.redirect("/loading_adm");
    }
    else
    {
      res.sendFile(__dirname + "/public/html/errorLogin.html")
    }
  });

  app.post("/taskDetail", async(req,res)=> {
    if(LOGGIN == '1')
    {
      const viewsTasks = {
        tasks: TASKS.tasks,
        status: TASKS.status,
        description: TASKS.desc,
        witch: req.body.taskname,
        teamUser: TEAM.userName,
        teamTask: TEAM.taskName,
        refresh: TEAM.refreshGet,
        assigments: ASSIG.Assignment, 
      };
      res.render("taskDetail", viewsTasks);
    }
    else
    {
      res.sendFile(__dirname + "/public/html/errorLogin.html")
    }
  });

  app.post("/addteammate", (req,res)=>
  {
    if(LOGGIN == '1')
    {
      const user = req.body.nick;
      const task = req.body.task;
      TEAM.AddTeam(user,task);
      TEAM.refreshGet(); 
      const viewsTasksAdm = {
        tasks: TASKS.tasks,
        status: TASKS.status,
        description: TASKS.desc,
      };
      res.render("showTask", viewsTasksAdm);
    }
    else
    {
      res.sendFile(__dirname + "/public/html/errorLogin.html")
    }
  });
  app.post("/deleteteammate", (req,res)=>
  {
    if(LOGGIN == '1')
    {
      const user = req.body.nick;
      const task = req.body.task;
      TEAM.DeleteTeam(user,task); 
      TEAM.celarTables(); 
      TEAM.refreshGet();
      const viewsTasksAdm = {
        tasks: TASKS.tasks,
        status: TASKS.status,
        description: TASKS.desc,
      };
      res.render("showTask", viewsTasksAdm);
    }
    else
    {
      res.sendFile(__dirname + "/public/html/errorLogin.html")
    }

  });
  app.post("/addAssignments", (req, res) =>
  {
    if(LOGGIN == '1')
    {
      const task = req.body.task;
      const assignment = req.body.assignment;
      ASSIG.addAssigments(task, assignment); 
      ASSIG.getAssgiments();
    } 
    else
    {
      res.sendFile(__dirname + "/public/html/errorLogin.html")
    }
  });

  app.post("/modifyAssignment", (req,res) => {
    if(LOGGIN == '1')
    {
      const toUpdate = []; 
      let nazwaas = []; 
      ASSIG.Assignment.forEach((elem,index,arr) => {
          if(elem.nazwa == req.body.assignment)
          {
            console.log("Modyfikuje: ", LogginName);
            console.log("wybrales: ",elem.nazwa)
            ASSIG.UpdateAssigments(LogginName, elem.task, elem.nazwa); 
            ASSIG.getAssgiments();
            const viewsTasksAdm = {
              tasks: TASKS.tasks,
              status: TASKS.status,
              description: TASKS.desc,
            };
            res.render("showTask", viewsTasksAdm);
          }
      }); 
    }
    else
    {
      res.sendFile(__dirname + "/public/html/errorLogin.html")
    }
  });

app.listen(PORT, () => {
  console.log(`My app is running on htts://localhost:${PORT}`);
});