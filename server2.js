const express = require('express');
const session = require('express-session');
const app = express();
const port = 4000
const mysql = require("mysql2")

app.use(express.json())
app.use(express.urlencoded({extended:true}))


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
    if (username === 'admin' && password === 'admin') {
        req.session.isAuthenticate = true;
        res.send('login sukses');
    } else {
        res.status(401).send('username atau password anda salah !!!')
    }
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