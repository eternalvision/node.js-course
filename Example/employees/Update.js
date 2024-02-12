const response = require("../helpers/ResponseHandler");

const query = `UPDATE employees SET username = $1, email = $2 WHERE id = $3 RETURNING *`;

module.exports = async (id, username, email, pool, res) => {
    try {
        const result = await pool.query(query, [username, email, id]);

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
                JSON.stringify(result.rows[0]),
            );
        }
    } catch (error) {
        await response(res, "application/json", 500, JSON.stringify(error));
    }
};
