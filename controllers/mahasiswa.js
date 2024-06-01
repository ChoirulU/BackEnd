const Mahasiswa = require('../models/mahasiswa');

module.exports = {
    insert: async (req, res) => {
        const data = new Mahasiswa({
            nim: req.body.nim,
            nama: req.body.nama,
            angkatan: req.body.angkatan,
            prodi: req.body.prodi,
        });

        try {
            const dataToSave = await data.save();
            res.status(200).json(dataToSave);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    getMahasiswa: async (req, res) => {
        try {
            const data = await Mahasiswa.find();
            res.json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getMahasiswaByNim: async (req, res) => {
        const nim = req.params.nim;
        try {
            const data = await Mahasiswa.find().where('nim').equals(nim);
            res.json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    update: async (req, res) => {
        const filter = { nim: req.params.nim };
        const updateData = {
            nama: req.body.nama,
            angkatan: req.body.angkatan,
            prodi: req.body.prodi,
        };
        try {
            const updatedData = await Mahasiswa.findOneAndUpdate(filter, updateData, { new: true });
            res.status(200).json(updatedData);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    delete: async (req, res) => {
        const filter = { nim: req.params.nim };
        try {
            await Mahasiswa.deleteOne(filter);
            res.send("Data telah terhapus");
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};
