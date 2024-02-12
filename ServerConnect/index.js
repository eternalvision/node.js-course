const pool = require("./database");

// const SQLquery = `
// CREATE TABLE users (
//     id SERIAL PRIMARY KEY,
//     username VARCHAR(50),
//     email VARCHAR(100)
// )
// `;

// pool.query(SQLquery, (err, res) => {
//     if (err) console.error(err);

//     console.log(res);
// });

pool.query("SELECT * FROM users", (err, res) => {
    if (err) console.error(err);

    for (let row of res.rows) {
        console.log(row);
    }
    console.table(res.rows);
});
