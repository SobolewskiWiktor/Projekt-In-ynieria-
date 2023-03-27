// Importing modules
const express = require("express");
const log = require("./database.js");
const TASKS = require("./public/js/tasks");
const USER = require("./public/js/user");
const TEAM = require("./public/js/team");
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
  const viewsTasks = {
    tasks: TASKS.tasks,
    status: TASKS.status,
    description: TASKS.desc,
  };
  res.render("dashboard_user", viewsTasks);
});

app.get("/dashboard_admin.html", (req, res) => {
  const viewsUsers = {
    Name: USER.usersName,
    Surname: USER.usersSurname,
    Login: USER.usersLogin,
    Status: USER.usersStatus,
    Ref: USER.refreshGet,
  };
  res.render("dashboard_admin", viewsUsers);
});

//logins
app.get("/loading_adm", (req, res) => {
  res.sendFile(__dirname + "/public/html/loading_admin.html");
});
app.get("/loading_usr", (req, res) => {
  res.sendFile(__dirname + "/public/html/loading_user.html");
});

//users
app.get("/adminAddUser", (req, res) => {
  res.render("addUser");
});

//tasks
app.get("/addTask", (req, res) => {
  res.render("addTask");
});
app.get("/showTask", (req, res) => {
  const viewsTasksAdm = {
    tasks: TASKS.tasks,
    status: TASKS.status,
    description: TASKS.desc,
  };
  res.render("showTask", viewsTasksAdm);
});

// Paths
app.post("/login", async (req, res) => {
  console.log("start login section");

  const userPassword = req.body.password;
  console.log("PG PASS: ", userPassword);
  const userLogin = req.body.username;
  console.log("PG LOGIN: ", userLogin);

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
              console.log("ROLA: ", result[0].typ);
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

app.post("/addUser", async (req, res) => {
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
});


app.post("/addTask", async (req, res) => {
  const Name = req.body.name;
  const TargetDate = req.body.target_date;
  const Desc = req.body.desc;
  const User = req.body.userlog;

  TASKS.add(Name, TargetDate, Desc, User);
  TASKS.refresh();
  res.redirect("/loading_adm");
});

app.post("/taskDetail", async(req,res)=> {
  const viewsTasks = {
    tasks: TASKS.tasks,
    status: TASKS.status,
    description: TASKS.desc,
    witch: req.body.taskname,
    teamUser: TEAM.userName,
    teamTask: TEAM.taskName,
    refresh: TEAM.refreshGet,
  };
  res.render("taskDetail", viewsTasks);
});

app.listen(PORT, () => {
  console.log(`My app is running on htts://localhost:${PORT}`);
});