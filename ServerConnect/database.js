const { Pool } = require("pg"); //postgree

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "test",
    password: "290501",
    port: 5432,
});

module.exports = pool;
