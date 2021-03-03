const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    server: process.env.DB_SERVERNAME,
    database: process.env.DB_DATABASENAME,
    port: Number(process.env.DB_PORT),
    options: {
        enableArithAbort: true
    }
};

module.exports = dbConfig;