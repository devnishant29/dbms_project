const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

var mysql = require("mysql");
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "30082003",
  database: "register",
});

con.connect(function (error) {
  if (error) throw error;
  console.log("connected");
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    con.query(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [username, password],
      function (error, result, fields) {
        console.log(result);
        if (result.length > 0) {
          res.send(result);
        } else {
          res.send({ message: "Wrong username or password" });
        }
      }
    );
  } else {
    res.send("Please enter Username and Password!");
    res.end();
  }

  // var sql = "SELECT * FROM users WHERE username = ? AND password = ?";
  // var values = [[username, password]];
  // con.query(sql, [values], function (err, result) {
  //   console.log(result);
  //     if (err) {
  //       req.setEncoding({ err: err });
  //     } else {
  //       if (result.length > 0) {
  //         res.send(result);
  //       } else {
  //         res.send({ message: "Wrong username or password" });
  //       }
  //     }
  //   }
  // );
});

app.post("/register", (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  console.log(username);
  console.log(email);
  console.log(password);
  var sql = "INSERT INTO  users (email, username, password) VALUES ?";
  var values = [[email, username, password]];
  con.query(sql, [values], function (err, result) {
    console.log(result);
    if (result) {
      res.send(result);
    } else {
      res.send({ message: "Enter correct asked details" });
    }
  });
});

app.listen(3001, () => {
  console.log("running backend server");
});
