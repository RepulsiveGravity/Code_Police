const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false, // Required for Neon.tech connections
    },
});

// Test the connection
pool.connect((err) => {
    if(err) console.error('Connection error', err.stack);
    else console.log('Connected to Neon PostgreSQL database');
});

module.exports = pool;