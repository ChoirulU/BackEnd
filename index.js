const express = require('express');
const app = express();
const port = 5000;

app.get('/', (req, res) => {
    res.send('WELCOME')
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