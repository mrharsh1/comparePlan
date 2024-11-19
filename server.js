const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = 5000;

// Enable CORS
app.use(cors());

// Create connection to MySQL
const db = mysql.createConnection({
    host: "localhost", // Hostname (phpMyAdmin ke liye usually localhost)
    user: "root", // Your MySQL username
    password: "", // Your MySQL password
    database: "bimascoredb", // Database name
});

// Test connection
db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err.stack);
        return;
    }
    console.log("Connected to MySQL database on aws");
});

// API endpoint to fetch data from "mytable"
app.get("/api/bima-score", (req, res) => {
    const query = "SELECT * FROM mytable";
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});