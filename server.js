const express = require('express');
const mysql = require("mysql");
const app = express();
const port = 4000;

// Untuk menerima req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Membuat koneksi database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mahasiswa'
});

// Membuka koneksi Mysql
connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database");
});

// Endpoint untuk mahasiswa
app.get('/mahasiswa', (req, res) => {
    connection.query("SELECT * FROM mahasiswa", (err, data) => {
        if (err) {
            console.log("error: ", err);
            res.status(500).send({
                message: err.message || "Terjadi kesalahan saat mengambil data mahasiswa"
            });
        } else {
            res.send(data);
        }
    });
});

app.get('/mahasiswa/:nim', (req, res) => {
    const nim = req.params.nim;
    connection.query(`SELECT * FROM mahasiswa WHERE nim = '${nim}'`, (err, data) => {
        if (err) {
            console.log("error: ", err);
            res.status(500).send({
                message: err.message || "Terjadi kesalahan saat mengambil data mahasiswa"
            });
        } else {
            res.send(data);
        }
    });
});

app.post('/mahasiswa', (req, res) => {
    const mahasiswaBaru = req.body;
    connection.query("INSERT INTO mahasiswa SET ?", mahasiswaBaru, (err) => {
        if (err) {
            console.log("error: ", err);
            res.status(500).send({
                message: err.message || "Terjadi kesalahan saat menyimpan data mahasiswa"
            });
        } else {
            res.send(mahasiswaBaru);
        }
    });
});

app.put('/mahasiswa/:nim', (req, res) => {
    const nim = req.params.nim;
    const mhs = req.body;
    const qstring = `UPDATE mahasiswa
                     SET nama = '${mhs.nama}', angkatan = '${mhs.angkatan}', prodi = '${mhs.prodi}'
                     WHERE nim = '${nim}'`;
    connection.query(qstring, (err, data) => {
        if (err) {
            res.status(500).send({
                message: "Error update mahasiswa with NIM" + nim
            });
        } else if (data.afffectedRows === 0) {
            res.status(404).send({
                message: `Mahasiswa dengan NIM ${nim} tidak ditemukan`
            });
        } else {
            console.log("Update mahasiswa: ", { nim: nim, ...mhs });
            res.send({ nim: nim, ...mhs });
        }
    });
});

app.delete('/mahasiswa/:nim', (req, res) => {
    const nim = req.params.nim;
    const qstring = `DELETE FROM mahasiswa WHERE nim = '${nim}'`;
    connection.query(qstring, (err, data) => {
        if (err) {
            res.status(500).send({
                message: "Error deleting mahasiswa with NIM: " + nim
            });
        } else if (data.afffectedRows === 0) {
            res.status(404).send({
                message: `Mahasiswa dengan NIM ${nim} tidak ditemukan.`
            });
        } else {
            res.send(`Mahasiswa dengan NIM ${nim} telah terhapus`);
        }
    });
});

app.listen(port, () => {
    console.log(`server berjalan pada localhost:${port}`);
});