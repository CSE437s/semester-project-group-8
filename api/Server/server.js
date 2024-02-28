const express = require("express");
const app = express();
const session = require("express-session");
const mysql = require('mysql2');
const cors = require("cors")
const bcrypt = require('bcrypt');
const store = new session.MemoryStore();
require('dotenv').config();
const serverless = require("serverless-http"); // this helps host the backend code (server.js) on vercel

app.use(cors({
  origin: "https://semester-project-group-8.vercel.app",
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json());       // to ssupport JSON-encoded bodies
app.use(express.urlencoded({ extended: true }))

app.use(session({
  secret: 'secret',
  cookie: {secure: true},
  saveUninitialized: true, 
  store: store
}))

// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "password",
//     database: "LiftingApp"
// })
const db = mysql.createConnection(process.env.DATABASE_URL)

// Test if the database is connected.
db.connect((err) => {
  if(err) {
    console.log(err)
  } else {
    console.log("Connected to MySQL")
  }
})

app.get('/test-db', (req, res) => {
  const query = 'SELECT username FROM users;';

  db.query(query, (err, results) => {
    if (err) {
      console.error("Failed to query the database:", err);
      return res.status(500).json({ success: false, message: 'Failed to query the database', error: err.message });
    }
    console.log("Usernames:", results.map(user => user.username));
    return res.json({ success: true, message: 'Successfully fetched usernames', usernames: results.map(user => user.username) });
  });
});

//from Geoffrey's creative project. will need to adjust
app.post('/login', (req, res) =>{
  console.log("login request");
  const credentials = req.body;
  console.log(credentials);
  const username = credentials.username;
  const password = credentials.password;
  const sql = `SELECT id, password FROM users WHERE username = ?`;
  db.query(sql, [username], async (err, data) => {
      console.log(err, data);
      if(err) return res.json(err);
      if (data.length == 0) {
        // Username not found
        return res.status(404).json({ success: "false", message: 'Invalid username or password' });
      }
      if(req.session.authenticated) {
        console.log(req.session);
      }
      else{
        const match = await bcrypt.compare(password, data[0].password);
        if(match){
          req.session.authenticated = true;
          req.session.user_id = data[0].id;
          console.log(req.session);
          return res.json({ success: "true" , message: 'Login successful' });
        } 
        else {
            return res.status(401).json({ success: "false", message: 'Invalid username or password' });
        }
      }
  })
})

app.post('/signup', (req, res) =>{
  console.log("signpup request");
  const credentials = req.body;
  const username = credentials.username;
  const password = credentials.password;
  const email = credentials.email;
  const goal = credentials.goal;
  const birthday = credentials.birthday;
  const gender = credentials.gender;
  const intensity = credentials.intensity;

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
            //take out goal, birthday, gender, intensity
            const sql = `INSERT INTO users (username, password, email, goal, birthday, gender, intensity)  VALUES (?,?,?,?,?,?,?)`;
            db.query(sql, [username, hash, email, goal, birthday, gender, intensity], (err, data) => {
              console.log(err, data);
              if(err) return res.json(err);
              return res.json({ message: 'Signup successful' });
          })
        });
      }
  })
});

app.post('/signup2', (req, res) =>{
  console.log("signpup2 request");
  const profileInfo = req.body;
  const username = profileInfo.email;
  const goal = profileInfo.goal;
  const birthday = profileInfo.birthday;
  const gender = profileInfo.gender;
  const intensity = profileInfo.intensity;

  const sqlCheckDup = `SELECT username FROM users WHERE username = ?`;
  db.query(sqlCheckDup, [username], (err, data) => {
    console.log(err, data);
    if(err) return res.json(err);
    if(data.length > 0 && username == data[0].username){
      const sql = `INSERT INTO users (goal, birthday, gender, intensity) VALUES (?,?,?,?) WHERE username = ?`;
      db.query(sql, [goal, birthday, gender, intensity, username], (err, data) => {
        console.log(err, data);
        if(err) return res.json(err);
        return res.json({ message: 'Signup successful' });
      })
    }
    else{
      console.log("User not found");
      return res.json({ error: 'User not found'});
    }
  })
});

//fix to use correct db column names, also need to retrieve userId
app.post('/addset', (req, res) =>{
  console.log("add set");
  const credentials = req.body;
  console.log(credentials);
  const user_id = credentials.user_id;
  const sleepQuality = null;
  const stressLevel = null;
  const desireToTrain = null;
  if(req.session.sleepQuality != null){
    sleepQuality = req.session.sleepQuality;
  }
  if(req.session.stressLevel != null){
    stressLevel = req.session.stressLevel;
  }
  if(req.session.desireToTrain != null){
    desireToTrain = req.session.desireToTrain;
  }
  const lift_id = credentials.lift_id;
  const set_num = credentials.set_num;
  const rep_num = credentials.rep_num;
  const weight = credentials.weight;
  //not yet implemented
  // const sleepQuality
  // const stressLevel
  // const desireToTrain
  const date = credentials.date;
  const sql = `INSERT INTO Exercise (user_id, lift_id, set_num, rep_num, weight, sleep_quality, stress_level, desire_to_train, date) VALUES (?,?,?,?,?,?,?,?,?)`;
  db.query(sql, [user_id, lift_id, set_num, rep_num, weight, sleepQuality, stressLevel, desireToTrain, date], (err, data) => {
      console.log(err, data);
      if(err) return res.json(err);
      return res.json({message: 'set input into database' });
  })
});

app.post('/simpleMaxCalculate', (req, res) =>{
  console.log("rpe request");
  const liftInfo = req.body;
  const weight = liftInfo.weight;
  const reps = liftInfo.reps;
  const rpe = liftInfo.rpe;
  const sql = `SELECT ? FROM RPE WHERE reps = ?`
  db.query(sql, [rpe, reps], (err, data) => {
    console.log(err, data);
    if(err) return res.json(err);
    if (data.length > 0) {
      const percentage = data[0].rpe; // Assuming the query returns only one row
      const theoreticMaxLift = weight/percentage;
      res.json({ theoreticMaxLift: theoreticMaxLift });
    } else {
      res.json({ error: 'No data found for the given reps' });
    }
  })  
});

app.get('/getlifts', (req, res) => {
  console.log("Request for lifts from lift table");
  const sql = "SELECT * FROM Lift";
  db.query(sql, (err, data) => {
      if (err) {
          return res.status(500).json(err);
      }
      return res.json(data);
  });
});


//from Geoffrey's creative project. will need to adjust

db.on('error', function(err) {
    console.log("[mysql error]",err);
});

app.listen(3000, () => {
  console.log("app listening on port 3000")
});

//startworkout form data
app.post('/workout', (req, res) => {
  console.log("Start workout request");
  // Extract data from the request body
  const { sleepQuality, stressLevel, desireToTrain } = req.body;

  //add variables to session
  if(sleepQuality == null || stressLevel == null || desireToTrain == null){
    res.json({ error: 'sleepQuality, stressLevel, and desireToTrain are not filled in fields' });
  }
  else{
    req.session.sleepQuality = sleepQuality;
    req.session.stressLevel = stressLevel;
    req.session.desireToTrain = desireToTrain;
    console.log(req.session);
  }

  // Respond to the client
  res.json({ success: true, message: 'Data received successfully' });
});

app.post('/endworkout', (req, res) => {
  console.log("End workout request");
  //add variables to session
  if(req.session.sleepQuality != null || req.session.stressLevel != null || req.session.desireToTrain != null){
    req.session.sleepQuality = null;
    req.session.stressLevel = null;
    req.session.desireToTrain = null;
    console.log(req.session);
  }
  else{
    console.log("No active workout to end")
  }

  // Respond to the client
  res.json({ success: true, message: 'Workout ended' });
});

app.post('/signout', (req, res) => {
  console.log("Signout request");
  //add variables to session
  if(req.session.authenticated == true){
    req.session.destroy();
  }
  else{
    console.log("No user session to end")
  }

  // Respond to the client
  res.json({ success: true, message: 'User signed out' });
});

module.exports = app;
module.exports.handler = serverless(app);