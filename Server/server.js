const express = require("express")
const app = express()
const mysql = require('mysql');
const cors = require("cors")

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true }))
app.use(cors())


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "LiftingApp"
})

// Test if the database is connected.
db.connect((err) => {
  if(err) {
    console.log(err)
  } else {
    console.log("Connected to MySQL")
  }
})


//from Geoffrey's creative project. will need to adjust
app.post('/login', (req, res) =>{
  console.log("login request");
  credentials = req.body.credentials;
  console.log(credentials);
  username = credentials.username;
  password = credentials.password;
  const sql = `SELECT Password FROM users WHERE Username = ?`;
  db.query(sql, [username], (err, data) => {
      console.log(err, data);
      if(err) return res.json(err);
      if(password == data[0].Password){
          return res.json({ success: "true" , message: 'Login successful' });
      } else {
          return res.status(401).json({ success: "false", message: 'Invalid username or password' });
      }
  })
})

app.post('/signup', (req, res) =>{
  console.log("signpup request");
  credentials = req.body.credentials;
  console.log(credentials);
  username = credentials.username;
  password = credentials.password;
  const sqlCheckDup = `SELECT Username FROM users WHERE Username = ?`;
  db.query(sqlCheckDup, [username], (err, data) => {
      console.log(err, data);
      if(err) return res.json(err);
      if(data.length > 0 && username == data[0].Username){
          console.log("User already exists");
          return res.json({ message: 'User already exists' });
      }
      else{
          const sql = `INSERT INTO users (Username, Password)  VALUES (?,?)`;
          db.query(sql, [username,password], (err, data) => {
              console.log(err, data);
              if(err) return res.json(err);
              return res.json({ message: 'Signup successful' });
          })
      }
  })
})

app.post('/liftentry', (req, res) =>{
  console.log("lift entry");
  credentials = req.body.credentials;
  console.log(credentials);
  username = credentials.username;
  lift = credentials.lift;
  date = credentials.date;
  weight = credentials.weight;
  const sql = `INSERT INTO lifts (Username, Lift, Date, Weight) VALUES (?,?,?,?)`;
  db.query(sql, [username, lift, date, weight], (err, data) => {
      console.log(err, data);
      if(err) return res.json(err);
      return res.json({message: 'Lift input into database' });
  })
})

//from Geoffrey's creative project. will need to adjust

db.on('error', function(err) {
    console.log("[mysql error]",err);
});

app.listen(3000, () => {
  console.log("app listening on port 3000")
})