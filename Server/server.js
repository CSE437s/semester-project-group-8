const express = require("express")
const app = express()
const mysql = require('mysql');
const cors = require("cors")
const bcrypt = require('bcrypt');

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
  const credentials = req.body;
  console.log(credentials);
  const username = credentials.username;
  const password = credentials.password;
  const sql = `SELECT password FROM users WHERE username = ?`;
  db.query(sql, [username], async (err, data) => {
      console.log(err, data);
      if(err) return res.json(err);
      const match = await bcrypt.compare(password, data[0].password);
      if(match){
          return res.json({ success: "true" , message: 'Login successful' });
      } else {
          return res.status(401).json({ success: "false", message: 'Invalid username or password' });
      }
  })
})

app.post('/signup', (req, res) =>{
  console.log("signpup request");
  const credentials = req.body;
  const username = credentials.username;
  const password = credentials.password;

  const sqlCheckDup = `SELECT username FROM users WHERE username = ?`;
  db.query(sqlCheckDup, [username], (err, data) => {
      console.log(err, data);
      if(err) return res.json(err);
      if(data.length > 0 && username == data[0].username){
          console.log("User already exists");
          return res.json({ error: 'User already exists' });
      }
      else{
          bcrypt.hash(password, 10, function(err, hash) {
            if (err) return res.json(err);
            const sql = `INSERT INTO users (username, password)  VALUES (?,?)`;
            db.query(sql, [username, hash], (err, data) => {
              console.log(err, data);
              if(err) return res.json(err);
              return res.json({ message: 'Signup successful' });
          })
        });
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