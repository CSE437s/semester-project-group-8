const express = require("express");
const app = express();
const session = require("express-session");
const mysql = require('mysql');
const cors = require("cors")
const bcrypt = require('bcrypt');
const axios = require('axios');
const store = new session.MemoryStore();
// require('.env').config();
// const serverless = require("serverless-http"); // this helps host the backend code (server.js) on vercel

app.use(cors());

app.use(express.json());       // to ssupport JSON-encoded bodies
app.use(express.urlencoded({ extended: true }))

app.use(session({
  secret: 'secret',
  cookie: {secure: true},
  saveUninitialized: true,
  resave: false, 
  store: store
}));


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "LiftingApp"
})

//const db = mysql.createConnection(process.env.DATABASE_URL)

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
  console.log("Session Data:", req.session);
  const credentials = req.body;
  console.log(credentials);
  const user_id = credentials.user_id;
  let sleepQuality = null
  let stressLevel = null;
  let desireToTrain = null;
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
  const rpe = credentials.rpe; //TODO
  //eventually add to sql call 
  const date = credentials.date;
  //need to add check to see if set is already submitted
  const sql = `INSERT INTO Exercise (user_id, lift_id, set_num, rep_num, weight, sleep_quality, stress_level, desire_to_train, date) VALUES (?,?,?,?,?,?,?,?,?)`;
  db.query(sql, [user_id, lift_id, set_num, rep_num, weight, sleepQuality, stressLevel, desireToTrain, date], (err, data) => {
      console.log(err, data);
      if(err) return res.json(err);
      return res.json({message: 'set input into database' });
  })
});

app.post('/simplemaxcalculate', (req, res) =>{
  console.log("rpe request");
  const weight = req.query.weight;
  const rep_num = req.query.rep_num;
  const rpe = req.query.rpe;
  const sql = `SELECT ? FROM RPE WHERE reps = ?`
  db.query(sql, [rpe, rep_num], (err, data) => {
    console.log(err, data);
    if(err) return res.json(err);
    if (data.length > 0) {
      const percentage = data[0].rpe;
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

app.get('/recentLift', (req, res) => {
  const exercise_id = req.query.exercise_id;
  const user_id = session.user_id;
  const date = new Date().toJSON().slice(0, 10);
  console.log("Request most recent exercise for user ");
  //need to retrieve variables
  const sql = "SELECT rep_num, weight, rpe FROM Exercises WHERE user_id = ? AND exercise_id = ? AND set_num = (SELECT MAX(set_num) FROM Exercises WHERE user_id = ? AND exercise_id = ? AND date = ?)";
  db.query(sql, [user_id, exercise_id, user_id, exercise_id, date],(err, data) => {
    console.log(err, data);
    if(err) return res.json(err);
    console.log(data);
    return res.json(data);
  })
});

app.post('/recommendlift', (req, res) => {
  const prevliftdata = req.body;
  const exercise_id = prevliftdata.exercise_id;
  axios.get('/recentlift', {
    params: {
      exercise_id: exercise_id
    }
  })
  .then(response => {
    const recent_lift = response.data;
    const weight = recent_lift.weight;
    const rep_num = recent_lift.rep_num;
    const rpe = recent_lift.rpe;
    axios.get('/simplemaxcalculate', {
      params: {
        weight: weight,
        rep_num: rep_num,
        rpe: rpe
      }
    })
    .then(response =>{
      const theoreticMaxLift = response.data;
      //TODO
      //use theoreticMaxLift to calculate future weight;
    })
  })
  .catch(error => {
    res.status(500).json({ error: 'An error occurred' });
  });
  //need to finish;
});

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