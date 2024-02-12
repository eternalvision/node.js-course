const response = require("../helpers/ResponseHandler");

const query = `INSERT INTO employees (username, email) VALUES ($1, $2) RETURNING *`;

module.exports = async (username, email, res, pool) => {
    try {
        const data = await pool.query(query, [username, email]);
        await response(res, "application/json", 200, JSON.stringify(data.rows));
    } catch (error) {
        await response(res, "application/json", 500, JSON.stringify(error));
    }
};
