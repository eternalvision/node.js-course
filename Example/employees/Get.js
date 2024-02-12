const response = require("../helpers/ResponseHandler");

const query = `SELECT * FROM employees`;

module.exports = async (pool, res) => {
    try {
        const data = await pool.query(query);
        await response(res, "application/json", 200, JSON.stringify(data.rows));
    } catch (error) {
        await response(res, "application/json", 500, JSON.stringify(error));
    }
};
