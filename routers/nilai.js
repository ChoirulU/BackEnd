const express = require('express');
const routerNilai = express.Router();
const ctrNilai = require("../controllers/nilai")

routerNilai.get('/nilai/:nim', ctrNilai.getNilaiByNim)
routerNilai.post('/nilai/:nim', ctrNilai.addNilai)
routerNilai.put('/nilai/:nim', ctrNilai.updateNilai)
routerNilai.delete('/nilai/:nim', ctrNilai.deleteNilai)

module.exports = routerNilai