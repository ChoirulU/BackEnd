const mysql = require("mysql")

// Membuat koneksi database
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'mahasiswa'
});

// Membuka koneksi Mysql
connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database");
});

module.exports = connection