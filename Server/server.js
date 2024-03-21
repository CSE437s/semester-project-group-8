const express = require("express");
const app = express();
const session = require("express-session");
const mysql = require('mysql');
const cors = require("cors")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios');
var nodemailer = require("nodemailer");
const store = new session.MemoryStore();

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

app.post('/login', (req, res) =>{
  console.log("login request");
  const credentials = req.body;
  console.log(credentials);
  const username = credentials.username;
  const password = credentials.password;
  const sql = `SELECT id, password, verified FROM users WHERE username = ?`;
  db.query(sql, [username], async (err, data) => {
      console.log(err, data);
      if(err) return res.json(err);
      if (data.length == 0) {
        // Username not found
        return res.status(404).json({ success: "false", message: 'Invalid username or password' });
      }
      if(data[0].verified == false){
        return res.json({ success: "false" , message: 'Please verify your email to log in' });
      }
      else{
        const match = await bcrypt.compare(password, data[0].password);
        if(match){
          return res.json({ user_id: data[0].id, success: "true" , message: 'Login successful' });
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
  const verified = false;

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
            let verificationcode = Math.floor(Math.random() * (99999-10000+1))+ 10000;
            if (err) return res.json(err);
            //take out goal, birthday, gender, intensity
            const sql = `INSERT INTO users (username, password, email, goal, birthday, gender, intensity, verified, verificationcode)  VALUES (?,?,?,?,?,?,?,?,?)`;
            db.query(sql, [username, hash, email, goal, birthday, gender, intensity, verified, verificationcode], (err, data) => {
              console.log(err, data);
              if(err) return res.json(err);

              var date = new Date();
              var mail = {
                "username": username,
                "created": date.toString()
              }
              let transporter = nodemailer.createTransport({
                  name: "http://localhost:3000/",
                  host: "smtp-relay.brevo.com", //needs to be SMTP server TODO: setup SMTP
                  port: 587, //needs to be SMTP
                  secure: false, // use SSL
                  auth: {
                      user: "gtlien1@gmail.com", // username for your mail server from SMTP
                      pass: "ZGgL9ywa3kDS5Enb", // password from SMTP
                  },

              });

              // send mail with defined transport object
              let info = transporter.sendMail({
                from: 'admin@LiftingApp.com', 
                to: email, 
                subject: "Account Verification",
                text: "Please save the following code to verify your account on the next page. \n Verification code: " + verificationcode,
            }, (error, info) => {

                if (error) {
                    console.log(error)
                    return;
                }
                console.log('Message sent successfully!');
                console.log(info);
                transporter.close();
            });
              //above is broken
              return res.json({ message: 'Signup successful' });
          })
        });
      }
  })
});

app.post('/verify', function(req, res) {
  const credentials= req.body;
  const verificationcode = credentials.verificationcode;
  const user_id = credentials.user_id;
  const sql = `SELECT verificationcode FROM users WHERE id = ?`;
  db.query(sql, [user_id], async (err, data) => {
      console.log(err, data);
      if(err) return res.json(err);
      if (data.length == 0) {
        // unable to verify user
        return res.status(404).json({ success: "false", message: 'unable to find user' });
      }
      if(data[0].verificationcode == verificationcode){
        //edit sql data for verified
        const sql = `UPDATE users SET verified = 1 WHERE id = ?`;
        db.query(sql, [user_id], async (err, data) => {
          console.log(err, data);
          if(err) return res.json(err);
        });
        return res.json({ success: "true" , message: "User verified!" });
      }
      else{
        return res.json({success:"false", message: "incorrect verification code"});
      }
  });
})

app.post('/signup2', (req, res) =>{
  console.log("signpup2 request");
  const profileInfo = req.body;
  const username = profileInfo.username;
  const goal = profileInfo.goal;
  const birthday = profileInfo.birthday;
  const gender = profileInfo.gender;
  const intensity = profileInfo.workoutIntensity;

  console.log("Received data:", req.body);

  const sqlCheckDup = `SELECT username FROM users WHERE username = ?`;
  db.query(sqlCheckDup, [username], (err, data) => {
    console.log(err, data);
    if(err) return res.json(err);
    if(data.length > 0 && username == data[0].username){
      const sql = `UPDATE users SET goal = ?, birthday = ?, gender = ?, intensity = ? WHERE username = ?`;
      db.query(sql, [goal, birthday, gender, intensity, username], (err, data) => {
        console.log(err, data);
        if(err) return res.json(err);
        return res.json({ message: 'Successfully inserted post signup form data' });
      })
    }
    else{
      console.log("User not found");
      return res.json({ error: 'User not found'});
    }
  })
});

app.post('/addset', (req, res) =>{
  console.log("add set");
  const credentials = req.body;
  console.log(credentials);
  const user_id = credentials.user_id;
  const sleepQuality = credentials.sleepQuality;
  const stressLevel = credentials.stressLevel;
  const desireToTrain = credentials.desrieToTrain;
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
  const lift_id = req.query.lift_id;
  const user_id = req.query.user_id;
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
  const weight = prevliftdata.weight;
  const rep_num = prevliftdata.rep_num;
  const rpe = prevliftdata.rpe;
  const lift_id = prevliftdata.lift_id;
  const set_num = prevliftdata.set_num;
  //should check if on third set, if so, change exercise
  //Two user flows to demonstrate for beta:
  // 1. populates squat as first exercise —> leg extension rec popup after 3 completed sets of squat 
  // 2. populates bench press as 1st exercise —> after 3 sets done —> bicep curl is recommended

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
    const new_rpe = 8; //this should be changed in future so that user can input
    const new_reps = 10; //this should be changed in future so that user can input
    axios.get('/simplemaxcalculate', {
      params: {
        weight: theoreticMaxLift,
        rep_num: new_reps,
        rpe: new_rpe
      }
    })
    res.end(JSON.stringify({ a: 1 //object TODO
  }));
  })
  .catch(error => {
    res.status(500).json({ error: 'An error occurred' });
  });
  //need to finish;
});

app.get('/totalpoundslifted', (req, res) =>{
  const user_id = req.body.user_id;
  let totalweight = 0;
  const sql = `SELECT rep_num, weight FROM exercise WHERE user_id = ?`;
  db.query(sql, [user_id], async (err, data) => {
    console.log(err, data);
    if(err) return res.json(err);
    if (data.length == 0){
      return res.status(404).json({ success: "false", message: 'No exercise data' });
    }
    for(var i = 0; i < data.length; i++){
      totalweight += data[i].rep_num * data[i].weight;
    }
    return res.json({ success: "true", totalpoundslifted: totalweight });
  });
})

db.on('error', function(err) {
    console.log("[mysql error]",err);
});

app.listen(3000, () => {
  console.log("app listening on port 3000")
});