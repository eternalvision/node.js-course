const query = `
    SELECT username, email, id
    FROM employees
    UNION
    SELECT username, email, user_id AS id
    FROM users
`;

const workersQuery = `
    SELECT * FROM workers
`;

module.exports = async (db) => {
    try {
        const data = {
            users: await db.query(query),
            workers: await db.query(workersQuery),
        };
        return data;
    } catch (error) {
        console.error(error);
    }
};
