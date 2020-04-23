const { Pool } = require('pg');
const dbConfig = require('./secrets/databaseConfiguration');

const pool = new Pool(dbConfig);

module.exports = pool;