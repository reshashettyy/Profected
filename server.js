import mysql from "mysql";
import config from "./config.js";
import fetch from "node-fetch";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import response from "express";
import admin from "firebase-admin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import serviceAccount from "./serviceAccountKey.json" assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://team-28-user-authenticat-e3566-default-rtdb.firebaseio.com/",
});

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));

const checkAuth = (req, res, next) => {
  const idToken = req.headers.authorization;
  if (!idToken) {
    return res.status(403).send("Unauthorized");
  }
  admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      req.user = decodedToken;
      next();
    })
    .catch((error) => {
      res.status(403).send("Unauthorized");
    });
};

//get all the resources from the database and into the calendar
app.post("/api/getCalendar", (req, res) => {
  let connection = mysql.createConnection(config);

  let sql = "SELECT * FROM CalendarEvents";

  connection.query(sql, (error, results) => {
    if (error) {
      return console.error(error.message);
    }

    let string = JSON.stringify(results);
    let obj = JSON.parse(string);
    console.log(obj);
    res.send(obj);
  });

  connection.end();
});

//get all the resources from the databases
app.post("/api/getResources", (req, res) => {
  let connection = mysql.createConnection(config);

  let sql = "SELECT * FROM Resources";

  connection.query(sql, (error, results) => {
    if (error) {
      return console.error(error.message);
    }

    let string = JSON.stringify(results);
    let obj = JSON.parse(string);
    console.log(obj);
    res.send(obj);
  });

  connection.end();
});

// API to add a user to the database
app.post("/api/addUser", checkAuth, (req, res) => {
  const { userID, firstName, lastName, emailaddress, userType } = req.body;

  let connection = mysql.createConnection(config);

  const sql = `INSERT INTO Users (userID, firstName, lastName, emailaddress, userType) 
				 VALUES (?, ?, ?, ?, ?)`;

  const data = [userID, firstName, lastName, emailaddress, userType];

  connection.query(sql, data, (error, results, fields) => {
    if (error) {
      console.error("Error adding User Type:", error.message);
      return res
        .status(500)
        .json({ error: "Error adding user to the database" });
    }

    return res.status(200).json({ success: true });
  });
  connection.end();
});

app.post("/api/addStudentTraits", (req, res) => {
  const { university, program, graduation_year, career_interest, skills } =
    req.body;

  let connection = mysql.createConnection(config);

  const sql = `INSERT INTO StudentTraits (university, program, graduation_year, career_interest, skills) 
               VALUES (?, ?, ?, ?, ?)`;

  const data = [university, program, graduation_year, career_interest, skills];

  connection.query(sql, data, (error, results, fields) => {
    if (error) {
      console.error("Error adding Student Traits:", error.message);
      return res
        .status(500)
        .json({ error: "Error adding student traits to the database" });
    }

    return res.status(200).json({ success: true });
  });

  connection.end();
});

app.post("/api/addProfessionalTraits", (req, res) => {
  const { university, program, company, job_title, skills } = req.body;

  let connection = mysql.createConnection(config);

  const sql = `INSERT INTO ProfessionalTraits (university, program, company, job_title, skills) 
               VALUES (?, ?, ?, ?, ?)`;

  const data = [university, program, company, job_title, skills];

  connection.query(sql, data, (error, results, fields) => {
    if (error) {
      console.error("Error adding Professional Traits:", error.message);
      return res
        .status(500)
        .json({ error: "Error adding professional traits to the database" });
    }

    return res.status(200).json({ success: true });
  });

  connection.end();
});

app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
