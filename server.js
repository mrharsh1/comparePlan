const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = 10000;

// Middleware to parse incoming JSON request bodies
app.use(express.json()); // This will parse JSON data

// Enable CORS for all routes
app.use(cors());

// Create connection to MySQL
const connection = mysql.createConnection({
    host: 'bimascoredb.ch8ua220oa6e.eu-north-1.rds.amazonaws.com', // AWS RDS MySQL server
    user: 'admin', // Your MySQL user
    password: 'Harshit9792', // Your MySQL password
    database: 'bimaScoreDB', // Your MySQL database name
    port: 3307 // MySQL port
});

// Test connection
connection.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err.message);
        process.exit(1); // Exit if the connection fails
    }
    console.log("Connected to MySQL database on AWS");
});

// API endpoint to fetch data from "mytable"
app.get("/api/bima-score", (req, res) => {
    const query = "SELECT * FROM mytable"; // Replace 'mytable' with the actual table name
    connection.query(query, (err, results) => {
        if (err) {
            console.error("Error executing query:", err.message);
            res.status(500).json({ error: "Failed to fetch data from the database" });
        } else {
            res.status(200).json(results);
        }
    });
});

// API endpoint to insert data into "getDetails" table
app.post("/api/add-detail", (req, res) => {
    const { customerName, callerName, customerEmail, customerContactNumber } = req.body;
    
    // Validate the input data
    if (!customerName || !callerName || !customerEmail || !customerContactNumber) {
        return res.status(400).json({ error: "All fields are required" });
    }

    // SQL query with placeholders for values
    const query = `INSERT INTO getDetails (customerName, callerName, customerEmail, customerContactNumber) 
                   VALUES (?, ?, ?, ?)`;

    // Execute the query and pass the data as an array to prevent SQL injection
    connection.query(query, [customerName, callerName, customerEmail, customerContactNumber], (err, result) => {
        if (err) {
            console.error("Error executing query:", err.message);
            return res.status(500).json({ error: "Failed to insert data into the database" });
        } else {
            res.status(201).json({ message: "Data inserted successfully", id: result.insertId });
        }
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
