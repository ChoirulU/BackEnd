const express = require('express');
const routerMhs = require('./routers/mahasiswa')
const routerMk = require('./routers/matakuliah')
const app = express();
const port = 4000;

// Untuk menerima req.body
app.use(express.json());
app.use(routerMhs)
app.use(routerMk)
app.use(express.urlencoded({ extended: true }));


app.listen(port, () => {
    console.log(`server berjalan pada localhost:${port}`);
});