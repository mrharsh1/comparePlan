// server.js
const express = require('express');
const apiRoute = require('./server/api/yourApiRoute.js'); // Import the API routes
const cors = require('cors'); // Import CORS if needed globally

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Apply CORS globally, or use as middleware per route in yourApiRoute if needed

// Route setup
app.use('/api', apiRoute);

// Root endpoint for server health check
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});