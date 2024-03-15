import mysql from "mysql";
import config from "./config.js";
import fetch from "node-fetch";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import response from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));

// API to add a user to the database
app.post("/api/addUser", (req, res) => {
  const { firstName, lastName, password, emailaddress, userType } = req.body;

  let connection = mysql.createConnection(config);

  const sql = `INSERT INTO Users (firstName, lastName, password, emailaddress, userType) 
				 VALUES (?, ?, ?, ?, ?)`;

  const data = [firstName, lastName, password, emailaddress, userType];

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
  const { firstName, lastName, password, emailaddress, userType } = req.body;

  let connection = mysql.createConnection(config);

  const sql = `INSERT INTO Users (firstName, lastName, password, emailaddress, userType) 
				 VALUES (?, ?, ?, ?, ?)`;

  const data = [firstName, lastName, password, emailaddress, userType];

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

app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
