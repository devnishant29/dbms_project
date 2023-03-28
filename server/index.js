const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());


// app.post("/register", (req, res) => {
//   const email = req.body.email;
//   const username = req.body.username;
//   const password = req.body.password;




  // con.connect(function (err) {
  //   if (err) throw err;
  //   console.log("Connected!");
  //   var sql =
  //     "INSERT INTO MY users (email, username, password) VALUES(email, username, password)";
  //     console.log(sql);
  //   con.query(sql, function (err, result) {
  //     if (result) {
  //       res.send(result);
  //     } else {
  //       res.send({ message: "Enter correct asked details" });
  //     }
  //   });
  // });

  // con.query(
  //   "INSERT INTO MY users (email, username, password) VALUES(?, ?, ?)",
  //   { email, username, password },
  //   (err, result) => {
  //     console.log(result);
  //     if (result) {
  //       res.send(result);
  //     } else {
  //       res.send({ message: "Enter correct asked details" });
  //     }
  //   }
  // );
// });



// app.listen(3001, () => {
//   console.log("running backend server");
// });


var mysql=require("mysql")
var con=mysql.createConnection({
  host: 'localhost',
  user: "root",
  password: "30082003",
  database: "register"
});

con.connect(function(error) {
  if(error) throw error;
  console.log("connected")
})

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  con.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    { username, password },
    (err, result) => {
      if (err) {
        req.setEncoding({ err: err });
      } else {
        if (result.length > 0) {
          res.send(result);
        } else {
          res.send({ message: "Wrong username or password" });
        }
      }
    }
  );
});


app.post("/register", (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  console.log(username);
  console.log(email);
  console.log(password);

  con.query(
      "INSERT INTO  users (email, username, password) VALUES(?, ?, ?)", {email, username, password},
      (err, result) => {
        console.log(result);
        if (result) {
          res.send(result);
        } else {
          res.send({ message: "Enter correct asked details" });
        }
      }
    );
});


app.listen(3001, () => {
  console.log("running backend server");
});

