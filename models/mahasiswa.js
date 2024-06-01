const mongoose = require('mongoose')

const mhsSchema = new mongoose.Schema({
    nim: {
        require: true,
        type: String
    },
    nama: {
        require: true,
        type: String
    },
    angkatan: {
        require: true,
        type: String
    },
    prodi: {
        require: true,
        type: String
    },
})

module.exports = mongoose.model('Mahasiswa', mhsSchema, 'mahasiswa')