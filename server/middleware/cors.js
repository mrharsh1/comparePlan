// server/middleware/cors.js
const cors = require('cors');

const corsOptions = {
    origin: '*', // Yaha '*' ka matlab hai sabko access, lekin production mein specific origin set karein
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
};

module.exports = cors(corsOptions);