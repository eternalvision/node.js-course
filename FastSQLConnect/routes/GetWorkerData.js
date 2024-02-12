const query = `
    SELECT worker_name, salary, department
    FROM workers
    WHERE salary <= $1 AND department = $2
`;

module.exports = async (salary, department, db) => {
    try {
        const data = await db.query(query, [salary, department]);
        return data;
    } catch (error) {
        console.error(error);
    }
};
