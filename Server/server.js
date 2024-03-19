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
            if (err) return res.json(err);
            //take out goal, birthday, gender, intensity
            const sql = `INSERT INTO users (username, password, email, goal, birthday, gender, intensity, verified)  VALUES (?,?,?,?,?,?,?,?)`;
            db.query(sql, [username, hash, email, goal, birthday, gender, intensity, verified], (err, data) => {
              console.log(err, data);
              if(err) return res.json(err);

              //this is broken
              var date = new Date();
              var mail = {
                "username": username,
                "created": date.toString()
              }
              const jwtSecretMail = 'secret';
              const baseUrl = 'http://localhost:3000/';
              //const baseUrl = 'https://semester-project-group-8.vercel.app/'
              const token_mail_verification = jwt.sign(mail, jwtSecretMail, { expiresIn: '1d' });
              var url = baseUrl + "verify?username=" + token_mail_verification;
              let transporter = nodemailer.createTransport({
                  //name: "https://semester-project-group-8.vercel.app/",
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
                  text: "Click on the link below to veriy your account " + url,
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

app.get('/verify', function(req, res) {
  token = req.query.username;
  if (token) {
      try {
          jwt.verify(token, config.jwt_secret_mail, (e, decoded) => {
              if (e) {
                  console.log(e)
                  return res.sendStatus(403)
              } else {
                  username = decoded.username;
                  //fix sql for specific user
                  const sql = `UPDATE users WHERE username = ? SET verified = true`;
                  db.query(sqlCheckDup, [username], (err, data) => {
                    console.log(err, data);
                    if(err) return res.json(err);
                    return res.json({ message: 'Successfully verified email' });
                  })
              }

          });
      } catch (err) {
          console.log(err)
          return res.sendStatus(403)
      }
  } else {
      return res.sendStatus(403)
  }
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

//fix to use correct db column names, also need to retrieve userId
app.post('/addset', (req, res) =>{
  console.log("add set");
  const credentials = req.body;
  console.log(credentials);
  const user_id = credentials.user_id;
  let sleepQuality = null
  let stressLevel = null;
  let desireToTrain = null;
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