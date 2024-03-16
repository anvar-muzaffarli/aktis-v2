const mysql = require("mysql2")
require("dotenv").config()


// Verilenler bazasinin elaqelendirilmesi

const database = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.VERILENLER_BAZASI_USER,
    password: process.env.BAZA_SHIFRE,
    database: process.env.BAZANIN_ADI
})


module.exports = database