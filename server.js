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

app.post("/api/addUser", checkAuth, (req, res) => {
  const { userID, firstName, lastName, emailaddress, userType } = req.body;

  let connection = mysql.createConnection(config);

  const sql = `INSERT INTO Users (userID, firstName, lastName, emailaddress, userType) 
               VALUES (?, ?, ?, ?, ?)`;

  const data = [userID, firstName, lastName, emailaddress, userType];

  connection.query(sql, data, (error, results, fields) => {
    if (error) {
      console.error("Error adding User:", error.message);
      return res
        .status(500)
        .json({ error: "Error adding user to the database" });
    }

    return res.status(200).json({ success: true });
  });

  connection.end();
});

app.post("/api/addStudentTraits", checkAuth, (req, res) => {
  const {
    university,
    program,
    graduation_year,
    career_interest,
    skills,
    userID,
  } = req.body;

  let connection = mysql.createConnection(config);

  const sql = `INSERT INTO StudentTraits (university, program, graduation_year, career_interest, skills, userID) 
               VALUES (?, ?, ?, ?, ?, ?)`;

  const data = [
    university,
    program,
    graduation_year,
    career_interest,
    skills,
    userID,
  ];

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

app.post("/api/addProfessionalTraits", checkAuth, (req, res) => {
  const { university, program, company, job_title, skills, userID } = req.body;

  let connection = mysql.createConnection(config);

  const sql = `INSERT INTO ProfessionalTraits (university, program, company, job_title, skills, userID) 
               VALUES (?, ?, ?, ?, ?, ?)`;

  const data = [university, program, company, job_title, skills, userID];

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

app.post("/api/addStudentAvailability", checkAuth, (req, res) => {
  const { userID, dates, start_time, end_time } = req.body;

  let connection = mysql.createConnection(config);

  const sql = `INSERT INTO StudentAvailability (userID, dates, start_time, end_time) 
               VALUES (?, ?, ?, ?)`;

  const data = [userID, dates, start_time, end_time];

  connection.query(sql, data, (error, results, fields) => {
    if (error) {
      console.error("Error adding Student Availability:", error.message);
      return res
        .status(500)
        .json({ error: "Error adding student availability to the database" });
    }

    return res.status(200).json({ success: true });
  });

  connection.end();
});

app.post("/api/addProfessionalAvailability", checkAuth, (req, res) => {
  const { userID, dates, start_time, end_time } = req.body;

  let connection = mysql.createConnection(config);

  const sql = `INSERT INTO ProfessionalAvailability (userID, dates, start_time, end_time) 
               VALUES (?, ?, ?, ?)`;

  const data = [userID, dates, start_time, end_time];

  connection.query(sql, data, (error, results, fields) => {
    if (error) {
      console.error("Error adding Professional Availability:", error.message);
      return res.status(500).json({
        error: "Error adding professional availability to the database",
      });
    }

    return res.status(200).json({ success: true });
  });

  connection.end();
});

app.post("/api/checkUserSubmission", checkAuth, (req, res) => {
  const { userID } = req.body;

  let connection = mysql.createConnection(config);

  const sql = `
    SELECT EXISTS(
      SELECT 1 FROM StudentTraits WHERE userID = ? 
      UNION ALL 
      SELECT 1 FROM ProfessionalTraits WHERE userID = ?
    ) AS userExists
  `;

  connection.query(sql, [userID, userID], (error, results) => {
    if (error) {
      console.error("Error checking User Submission:", error.message);
      connection.end();
      return res.status(500).json({ error: "Database query error" });
    }

    const userExists =
      results.length > 0 && results.some((row) => row.userExists === 1);
    connection.end();
    res.status(200).json({ exists: userExists });
  });
});

app.post("/api/getMatched", checkAuth, async (req, res) => {
  // Log the request body to see if userID is being sent correctly
  console.log("Request body:", req.body);

  const { userID } = req.body; // Get userID from the request body

  // Log the userID to see if it's being extracted correctly
  console.log("userID:", userID);

  // Retrieve the user's profile information from your database
  let connection = mysql.createConnection(config);
  let sql = "SELECT * FROM StudentTraits WHERE userID = ?";

  connection.query(sql, [userID], async (error, results) => {
    if (error) {
      console.error("Error fetching user profile:", error.message);
      connection.end();
      return res.status(500).json({ error: "Error fetching user profile" });
    }

    // Log the results to see if the userProfile has the correct values
    console.log("User profile:", results);

    if (results.length === 0) {
      connection.end();
      return res.status(404).json({ error: "User profile not found" });
    }

    const userProfile = {
      university: results[0].university,
      program: results[0].program,
      career_interest: results[0].career_interest,
      skills: results[0].skills,
    };

    // Log the userProfile to see if it's being constructed correctly
    console.log("Constructed userProfile:", userProfile);

    try {
      const pythonServiceResponse = await fetch("http://127.0.0.1:8000/match", {
        method: "POST",
        body: JSON.stringify(userProfile),
        headers: { "Content-Type": "application/json" },
      });

      if (!pythonServiceResponse.ok) {
        throw new Error(
          `Python service returned status: ${pythonServiceResponse.status}`
        );
      }

      const matchedProfessional = await pythonServiceResponse.json();
      connection.end();
      res.status(200).json(matchedProfessional);
    } catch (pythonServiceError) {
      console.error(
        "Error during matching process:",
        pythonServiceError.message
      );
      connection.end();
      res.status(500).json({ error: "Error during matching process" });
    }
  });
});

app.post("/api/getProfessionalInfo", checkAuth, (req, res) => {
  const { professionalId } = req.body;

  let connection = mysql.createConnection(config);

  const sql = `
    SELECT u.firstName, u.lastName, p.university, p.program, p.company, p.job_title, p.skills
    FROM Users u
    JOIN ProfessionalTraits p ON u.userID = p.userID
    WHERE u.userID = ?
  `;

  connection.query(sql, [professionalId], (error, results) => {
    if (error) {
      console.error("Error fetching professional info:", error.message);
      connection.end();
      return res
        .status(500)
        .json({ error: "Error fetching professional info" });
    }

    if (results.length === 0) {
      connection.end();
      return res.status(404).json({ error: "Professional not found" });
    }

    connection.end();
    res.status(200).json(results[0]);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
