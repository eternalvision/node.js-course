const pgp = require("pg-promise")();

module.exports = pgp("postgres://postgres:290501@localhost:5432/test");
