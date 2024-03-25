const express = require('express');
const app = express();
const port = 5000;

app.get('/', (req, res) => {
    res.send('WELCOME')
});

//req.params
app.get('/mahasiswa/:nim/:semester', (req, res) => {
    const nim = req.params.nim;
    const semester = req.params.semester;
    res.send(`NIM: ${nim} SEMESTER: ${semester}`);
});

//req.query
app.get('/mahasiswa', (req, res) => {
    const nim = req.query.nim;
    const semester = req.query.semester;
    res.send(`NIM: ${nim} SEMESTER: ${semester}`);
});

//req.body
app.use(express.json());

app.post('/mahasiswa', (req, res) => {
    const nim = req.body.nim;
    const semester = req.body.semester;
    const angkatan = req.body.angkatan;
    const prodi = req.body.prodi;

    //proses penyimpanan data mahasiswa
    res.send(`NIM: ${nim} 
              SEMESTER: ${semester}
              ANGKATAN: ${angkatan}
              PRODI: ${prodi}`);
});

app.post('/', (req, res) => {
    res.send('Post data')
});

app.put('/', (req, res) => {
    res.send('Update Data')
});

app.delete('/', (req, res) => {
    res.send('Hapus  Data')
});

app.listen(port, () => {
    console.log(`server berjalan pada port: ${port}`)
})   