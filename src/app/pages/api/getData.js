import mysql from 'mysql2';

// Create MySQL connection
const connection = mysql.createConnection({
    host: 'bimascoredb.ch8ua220oa6e.eu-north-1.rds.amazonaws.com', // XAMPP MySQL server is running on localhost
    user: 'admin', // Default MySQL user in XAMPP
    password: 'Harshit9792', // Default is empty password
    database: 'bimaScoreDB',
    port: '3307' // Your MySQL database name
});

export default function handler(req, res) {
    connection.connect((err) => {
        if (err) {
            return res.status(500).json({ error: 'Database connection failed', details: err });
        }

        // SQL query to fetch data
        const sqlQuery = 'SELECT * FROM mytable'; // Replace with your table name

        connection.query(sqlQuery, (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Error querying database', details: err });
            }

            res.status(200).json(results); // Send the fetched data as JSON response
        });

        connection.end();
    });
}