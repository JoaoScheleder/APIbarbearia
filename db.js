    

const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'desenvolvimento',
    password: 'postgres',
    port: 5432,
});


module.exports.pool = {
    query: (text, params) => pool.query(text, params),
  }