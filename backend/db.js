const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'gbt101',
    database: 'manutencaoCarro',
    port: 5432,
    ssl: false 
});

module.exports = pool;
