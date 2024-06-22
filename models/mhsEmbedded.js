const mongoose = require('mongoose')

const mhsEmbeddedSchema = new mongoose.Schema({
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
    nilai: [{
        kdmk : String,
        matakuliah : String,
        dosen : String,
        semester : Number,
        nilai : String
    }]
})

module.exports = mongoose.model('Mahasiswa', mhsEmbeddedSchema,'mahasiswa')