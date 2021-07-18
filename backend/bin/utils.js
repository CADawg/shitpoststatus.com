const mysql = require("mysql2");

// database pool
const dbPool = mysql.createPool({
    connectionLimit: parseInt(process.env.DB_CONNLIMIT),
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    charset: "utf8mb4"
});

module.exports = {dbPool: dbPool.promise(), dbPoolSync: dbPool};