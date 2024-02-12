const pool = require("./pool/pool");

pool.connect((err, client) => {
    if (err) {
        console.error(err);
    } else {
        console.log("Connect to database successful");

        pool.query("SELECT * FROM employees", (error, results) => {
            if (error) console.error(error);
            console.log(results.rowCount); // количество столбцов
            console.log(results.rows); // сами столбцы
        });

        pool.query("SELECT * FROM workers", (error, results) => {
            if (error) console.error(error);
            console.log(results.rowCount); // количество столбцов
            console.log(results.rows); // сами столбцы
            pool.end(); // закрытие запросов (взаимодействие с таблицами и прочим)
        });

        client.release();
    }
});
