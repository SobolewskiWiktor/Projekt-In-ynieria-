// Importing modules
const express = require("express");
const log = require("./database.js");
// Variables
const PORT = 80;

// Main APP
const app = express();

// Modules
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routing
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/html/login_screen.html");
});
app.get("/dashboard_user.html", (req, res) => {
  res.sendFile(__dirname + "/public/html/dashboard_user.html");
});
app.get("/dashboard_admin.html", (req, res) => {
  res.sendFile(__dirname + "/public/html/dashboard_admin.html");
});
app.get("/loading", (req, res) => {
  res.sendFile(__dirname + "/public/html/loading.html");
});

// Paths
app.post("/login", async (req, res) => {
  console.log("start login section");

  const userPassword = req.body.password;
  console.log(userPassword);
  const userLogin = req.body.username;
  console.log(userLogin);

  const login = (userLogin, userPassword) => {
    let userlogin = userLogin;
    let userpass = userPassword;

    if (userlogin != "" && userpass != "") {
      log.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        log.query(
          `select * from logins where login = ? and haslo = ?`,
          [userlogin, userpass],
          async (err, result) => {
            if (err) {
              console.log("ERROR", err);
            } else {
              if (result[0].haslo == userpass && result[0].login == userlogin) {
                console.log("loggin accepted");
                res.redirect("/loading");
              }
            }
          }
        );
      });
    }
  };
  login(userLogin, userPassword);
});

app.listen(PORT, () => {
  console.log(`My app is running on htts://localhost:${PORT}`);
});
