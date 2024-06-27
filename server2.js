const express = require('express');
const session = require('express-session');
const app = express();
const port = 4000
const mysql = require("mysql2")

app.use(express.json())
app.use(express.urlencoded({extended:true}))

//create a connection to thw database
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'mahasiswa'
});
connection.connect(error => {
if (error) throw error;
    console.log("Terhubung kedatabase mahasiswa.");
})


app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60000
    }
}));

const authenticate = (req, res, next) => {
    if (req?.session.isAuthenticate) {
        next()
    } else {
        res.status(401).send("tidak ter autentikasi")
    }
};

//register
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    connection.query(`INSERT INTO user VALUES ('${username}',PASSWORD('${password}'))`,
        (error,results) => {
            if (error) throw error;
            res.json({ message: 'Data berhasil ditambahkan', id: results.insertId});
        });
});

//Route Login
app.post('/login', (req, res) => {
    const {username, password} = req.body;

    connection.promise().query(`SELECT * FROM user WHERE username = '${username}'
                                AND password = PASSWORD('${password}')`)
    .then((results) => {
        if (results.length > 0) {
            //pengguna terautentikasi
            req.session.isAuthenticate = true;
            res.json({ message: 'Berhasil Login'});
        } else {
            //pengguna tidak terautentikasi
            res.status(401).send('Username atau password salah')
        }
    })
    // if (username === 'admin' && password === 'admin') {
    //     req.session.isAuthenticate = true;
    //     res.send('login sukses');
    // } else {
    //     res.status(401).send('username atau password anda salah !!!')
    // }
});

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if(err){
            console.log(err)
        } else {
            res.send('logout')
        }
    })
});

//Route GET yang membutuhkan autentikasi
app.get('/umam', authenticate, (req, res) => {
    res.send('anda masuk pada route (GET)')
})

//Route POST yang membutuhkan autentikasi
app.post('/umam', authenticate, (req, res) => {
    res.send('anda masuk pada route (POST)')
})

//Route PUT yang membutuhkan autentikasi
app.put('/umam', authenticate, (req, res) => {
    res.send('anda masuk pada route (PUT)')
})

//Route DELETE yang membutuhkan autentikasi
app.delete('/umam', authenticate, (req, res) => {
    res.send('anda masuk pada route (DELETE)')
})

app.listen(port, () => {
    console.log(`server berjalan dengan localhost:${port}`);
})