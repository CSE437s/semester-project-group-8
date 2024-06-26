const express = require("express");
const app = express();
const session = require("express-session");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");
var nodemailer = require("nodemailer");
const store = new session.MemoryStore();

app.use(cors());

app.use(express.json()); // to ssupport JSON-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "secret",
    cookie: { secure: true },
    saveUninitialized: true,
    resave: false,
    store: store,
  }),
);

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "LiftingApp",
});

// Test if the database is connected.
db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to MySQL");
  }
});

app.get("/test-db", (req, res) => {
  const query = "SELECT username FROM users;";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Failed to query the database:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to query the database",
        error: err.message,
      });
    }
    console.log(
      "Usernames:",
      results.map((user) => user.username),
    );
    return res.json({
      success: true,
      message: "Successfully fetched usernames",
      usernames: results.map((user) => user.username),
    });
  });
});

app.post("/login", (req, res) => {
  console.log("login request");
  const credentials = req.body;
  console.log(credentials);
  const username = credentials.username;
  const password = credentials.password;
  const sql = `SELECT id, password, verified FROM users WHERE username = ?`;
  db.query(sql, [username], async (err, data) => {
    console.log(err, data);
    if (err) return res.json(err);
    if (data.length == 0) {
      // Username not found
      return res
        .status(404)
        .json({ success: "false", message: "Invalid username or password" });
    }
    if (data[0].verified == false) {
      return res.json({
        success: "false",
        message: "Please verify your email to log in",
      });
    } else {
      const match = await bcrypt.compare(password, data[0].password);
      if (match) {
        return res.json({
          user_id: data[0].id,
          success: "true",
          message: "Login successful",
        });
      } else {
        return res
          .status(401)
          .json({ success: "false", message: "Invalid username or password" });
      }
    }
  });
});

app.post("/signup", (req, res) => {
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
    if (err) return res.json(err);
    if (data.length > 0 && username == data[0].username) {
      console.log("User already exists");
      return res.json({ error: "User already exists" });
    } else {
      bcrypt.hash(password, 10, function (err, hash) {
        let verificationcode =
          Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
        if (err) return res.json(err);
        //take out goal, birthday, gender, intensity
        const sql = `INSERT INTO users (username, password, email, goal, birthday, gender, intensity, verified, verificationcode)  VALUES (?,?,?,?,?,?,?,?,?)`;
        db.query(
          sql,
          [
            username,
            hash,
            email,
            goal,
            birthday,
            gender,
            intensity,
            verified,
            verificationcode,
          ],
          (err, data) => {
            console.log(err, data);
            if (err) return res.json(err);

            var date = new Date();
            var mail = {
              username: username,
              created: date.toString(),
            };
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
            let info = transporter.sendMail(
              {
                from: "admin@LiftingApp.com",
                to: email,
                subject: "Account Verification",
                text:
                  "Please save the following code to verify your account on the next page. \n Verification code: " +
                  verificationcode,
              },
              (error, info) => {
                if (error) {
                  console.log(error);
                  return;
                }
                console.log("Message sent successfully!");
                console.log(info);
                transporter.close();
              },
            );
            //above is broken
            return res.json({ message: "Signup successful" });
          },
        );
      });
    }
  });
});

app.post("/verify", function (req, res) {
  const credentials = req.body;
  const verificationcode = credentials.verificationcode;
  const username = credentials.username;
  const sql = `SELECT id, verificationcode FROM users WHERE username = ?`;
  db.query(sql, [username], async (err, data) => {
    console.log(err, data);
    console.log(data[0].verificationcode);
    if (err) return res.json(err);
    if (data.length == 0) {
      // unable to verify user
      return res
        .status(404)
        .json({ success: "false", message: "Unable to find user" });
    }
    if (Number(data[0].verificationcode) == Number(verificationcode)) {
      //edit sql data for verified
      const Updatesql = `UPDATE users SET verified = 1 WHERE username = ?`;
      db.query(Updatesql, [username], async (err, updateResult) => {
        console.log(err, updateResult);
        if (err) return res.json(err);
      });
      return res.json({
        success: "true",
        message: "User verified!",
        user_id: data[0].id,
      });
    } else {
      return res
        .status(404)
        .json({ success: "false", message: "Incorrect verification code" });
    }
  });
});

app.post("/signup2", (req, res) => {
  console.log("signpup2 request");
  const profileInfo = req.body;
  const username = profileInfo.username;
  const goal = profileInfo.goal;
  const birthday = profileInfo.birthday;
  const gender = profileInfo.gender;
  const intensity = profileInfo.workoutIntensity;

  console.log("Received data:", req.body);

  const sqlCheckDup = `SELECT username, id FROM users WHERE username = ?`;
  db.query(sqlCheckDup, [username], (err, data) => {
    console.log(err, data);
    if (err) return res.json(err);
    var user_id = data[0].id;
    if (data.length > 0 && username == data[0].username) {
      const sql = `UPDATE users SET goal = ?, birthday = ?, gender = ?, intensity = ? WHERE username = ?`;
      db.query(
        sql,
        [goal, birthday, gender, intensity, username],
        (err, data) => {
          console.log(err, data);
          if (err) return res.json(err);
          return res.json({
            message: "Successfully inserted post signup form data",
            user_id: user_id,
          });
        },
      );
    } else {
      console.log("User not found");
      return res.json({ error: "User not found" });
    }
  });
});

app.post("/addset", async (req, res) => {
  console.log("add set");
  const credentials = req.body;
  console.log(credentials);
  const user_id = credentials.user_id;
  const sleepQuality = credentials.sleep_quality;
  const stressLevel = credentials.stress_level;
  const desireToTrain = credentials.desire_to_train;
  const lift_id = credentials.lift_id;
  const set_num = credentials.set_num;
  const rep_num = credentials.rep_num;
  const weight = credentials.weight;
  const rpe = credentials.rpe; //TODO
  //eventually add to sql call
  const date = credentials.date;
  const dayvars = Number(sleepQuality) + Number(stressLevel) + Number(desireToTrain);
  //need to add check to see if set is already submitted
  console.log({
    user_id,
    lift_id,
    rpe,
    set_num,
    rep_num,
    weight,
    sleepQuality,
    stressLevel,
    desireToTrain,
    date,
  });
  const sql = `INSERT INTO Exercise (user_id, lift_id, rpe, set_num, rep_num, weight, sleep_quality, stress_level, desire_to_train, date) VALUES (?,?,?,?,?,?,?,?,?,?)`;
  db.query(
    sql,
    [
      user_id,
      lift_id,
      rpe,
      set_num,
      rep_num,
      weight,
      sleepQuality,
      stressLevel,
      desireToTrain,
      date,
    ],
    async (err, data) => {
      console.log(err, data);
      if (err) return res.json(err);
      try {
        const recommendlift_json = await recommendlift(
          weight,
          rep_num,
          rpe,
          lift_id,
          set_num,
          dayvars,
        );
        console.log("recommendlift_json: ", recommendlift_json);
        // Return the response with recommendlift_json
        res.json({
          message: "Set input into database",
          recommendlift: recommendlift_json,
        });
      } catch (error) {
        console.error("Error in addset: ", error);
        res.status(500).json({ error: "Internal server error" });
      }
    },
  );
});

function simplemaxcalculate(weight, rep_num, rpereq) {
  console.log("rpe request");
  console.log("repnum: " + rep_num);
  console.log("weight: " + weight);
  console.log("rpe: " + rpereq);

  const rpeColumn = `\`${rpereq}\``;
  const sql = `SELECT ${rpeColumn} FROM RPE WHERE reps = ?`;

  return new Promise((resolve, reject) => {
    db.query(sql, [rep_num], (err, data) => {
      console.log(err, data);
      if (err) {
        console.error(err);
        reject(err); // Reject the promise if there's an error
      } else if (data.length > 0) {
        const percentage = data[0][rpereq];
        console.log(percentage);
        const theoreticMaxLift = Number(weight) / percentage;
        console.log(theoreticMaxLift);
        resolve(theoreticMaxLift); // Resolve with the calculated value
      } else {
        console.log("SQL error for simple max calculate call");
        reject({ error: "No data found for the given reps" });
      }
    });
  });
}

async function recommendlift(weight, rep_num, rpe, lift_id, set_num, dayvars) {
  if (Number(rep_num) > 12){
    rep_num = Number(12);
  }
  console.log("checking what re_num is: " + rep_num);
  if (dayvars == null){
    dayvars = Number(12);
  }
  if (set_num >= 3) {
    if (lift_id == 2) {
      console.log("leg extension rec");
      return JSON.stringify({ rec_type: "exercise", lift_id: 6 }); // for leg extension recommendation
    } else if (lift_id == 1) {
      console.log("bicep curl rec");
      return JSON.stringify({ rec_type: "exercise", lift_id: 5 }); // for bicep curl recommendation
    } else if (lift_id == 3){
      console.log("lat pulldown rec");
      return JSON.stringify({ rec_type: "exercise", lift_id: 4}); // for lat pulldown recommendation
    }
  } else {
    // Await the resolution of simplemaxcalculate before proceeding
    const theoreticMaxLift = await simplemaxcalculate(weight, rep_num, rpe);
    console.log("theoreticMaxLift: ", theoreticMaxLift);
    var new_reps = 10;
    if (lift_id == 1 || lift_id == 2 || lift_id == 3){
      new_reps = 7;
    }
    var new_rpe = 8; 
    if ((dayvars/15) < .5){
      new_rpe = 6;
    }

    if ((dayvars/15) >= .85){
      new_rpe = 9;
    }
    try {
      const rpeColumn = `\`${new_rpe}\``;
      const sql = `SELECT ${rpeColumn} FROM RPE WHERE reps = ?`;
      const data = await new Promise((resolve, reject) => {
        db.query(sql, [new_reps], (err, result) => {
          if (err) {
            console.error(err);
            reject(err);
          } else if (result.length > 0) {
            resolve(result[0][new_rpe]);
          } else {
            console.log("SQL error for simple max calculate call");
            reject({ error: "No data found for the given reps" });
          }
        });
      });

      const percentage = data;
      console.log("dayvars: " + dayvars);
      const weight_rec =
        Math.round((Number(theoreticMaxLift) * percentage) / 5) * 5;
      console.log("weight_rec: ", weight_rec);

      // Now directly return the JSON stringified object with correct values
      return JSON.stringify({
        rec_type: "set",
        weight_rec: weight_rec,
        new_reps: new_reps,
        new_rpe: new_rpe,
        lift_id: lift_id,
      });
    } catch (error) {
      console.error("Error in calculating recommended lift: ", error);
      // Handle errors, perhaps by returning an error message or code
      return JSON.stringify({ error: "Failed to calculate recommended lift." });
    }
  }
}

app.get("/getlifts", (req, res) => {
  console.log("Request for lifts from lift table");
  const sql = "SELECT * FROM Lift";
  db.query(sql, (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.json(data);
  });
});

app.get("/recentLift", (req, res) => {
  const lift_id = req.query.lift_id;
  const user_id = req.query.user_id;
  const date = new Date().toJSON().slice(0, 10);
  console.log("Request most recent exercise for user ");
  const sql =
    "SELECT rep_num, weight, rpe FROM Exercises WHERE user_id = ? AND exercise_id = ? AND set_num = (SELECT MAX(set_num) FROM Exercises WHERE user_id = ? AND exercise_id = ? AND date = ?)";
  db.query(
    sql,
    [user_id, exercise_id, user_id, exercise_id, date],
    (err, data) => {
      console.log(err, data);
      if (err) return res.json(err);
      console.log(data);
      return res.json(data);
    },
  );
}); 

app.post("/totalpoundslifted", (req, res) => {
  const user_id = req.body.user_id;
  let totalweight = 0;
  const sql = `SELECT rep_num, weight FROM exercise WHERE user_id = ?`;
  db.query(sql, [user_id], async (err, data) => {
    console.log(err, data);
    if (err) return res.json(err);
    if (data.length == 0) {
      return res
        .status(404)
        .json({ success: "false", message: "No exercise data" });
    }
    for (var i = 0; i < data.length; i++) {
      totalweight += data[i].rep_num * data[i].weight;
    }
    return res.json({ success: "true", totalpoundslifted: totalweight });
  });
});

app.get("/exercisehistory", (req, res) => {
  const user_id = req.query.user_id;
  const sql = `SELECT * FROM exercise WHERE user_id = ?`;
  db.query(sql, [user_id], async (err, data) => {
    console.log(err, data);
    if (err) return res.json(err);
    if (data.length == 0) {
      return res
        .status(404)
        .json({ success: "false", message: "No exercise data" });
    }
    return res.json(data);
  });
});

app.get("/profile", (req, res) => {
  const user_id = req.query.user_id;
  const sql = `SELECT * FROM users WHERE id = ?`;
  db.query(sql, [user_id], async (err, data) => {
    console.log(err, data);
    if (err) return res.json(err);
    if (data.length == 0) {
      return res
        .status(404)
        .json({ success: "false", message: "No user data" });
    }
    return res.status(200).json(data);
  });
});

db.on("error", function (err) {
  console.log("[mysql error]", err);
});

app.listen(3000, () => {
  console.log("app listening on port 3000");
});


module.exports = { simplemaxcalculate, recommendlift, app, db};
