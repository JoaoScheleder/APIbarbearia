    

const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'barbeariaestilo',
    password: 'Mydas@2021',
    port: 5432,
});


module.exports.pool = {
    query: (text, params) => pool.query(text, params),
  }