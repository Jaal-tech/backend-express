// db.js
const { Pool } = require('pg');

// Replace these values with your actual DB config
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'your_db_name',
  password: 'your_password',
  port: 5432,
});

module.exports = pool;
