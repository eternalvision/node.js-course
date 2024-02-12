const response = require("../helpers/ResponseHandler");

const query = `DELETE FROM employees WHERE id = $1`;

module.exports = async (id, pool, res) => {
    try {
        const result = await pool.query(query, [id]);
        if (result.rowCount === 0) {
            await response(
                res,
                "application/json",
                404,
                JSON.stringify({ message: "Employee not found" }),
            );
        } else {
            await response(
                res,
                "application/json",
                200,
                JSON.stringify({ message: "Employee deleted success" }),
            );
        }
    } catch (error) {
        await response(
            res,
            "application/json",
            500,
            JSON.stringify({ error: error.message }),
        );
    }
};
