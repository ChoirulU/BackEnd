const express = require('express');
const routerMahasiswa = express.Router();

const controllerMahasiswa = require('../controllers/mahasiswa')

routerMahasiswa.route('/mahasiswa')
    .post(controllerMahasiswa.insert)
    .get(controllerMahasiswa.getMahasiswa)

routerMahasiswa.route('/mahasiswa/:nim')
    .get(controllerMahasiswa.getMahasiswaByNim)
    .put(controllerMahasiswa.update)
    .delete(controllerMahasiswa.delete)
    
module.exports = routerMahasiswa