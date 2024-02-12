const { Pool } = require("pg"); //postgree

const pool = new Pool({
    connectionString: "postgresql://postgres:290501@localhost:5432/test",
});

module.exports = pool;
