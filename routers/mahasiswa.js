const express = require('express');
const routerMhs = express.Router();
const ctrMhs = require("../controllers/mahasiswa")
const ctrUser = require("../controllers/user")

// Endpoint untuk mahasiswa
routerMhs.get('/mahasiswa', ctrUser.authenticate, ctrMhs.getMhs);
routerMhs.get('/mahasiswa/:nim', ctrUser.authenticate, ctrMhs.getBynim);
routerMhs.post('/mahasiswa',ctrUser.authenticate, ctrMhs.postMhs);
routerMhs.put('/mahasiswa/:nim',ctrUser.authenticate, ctrMhs.updateMhs);
routerMhs.delete('/mahasiswa/:nim',ctrUser.authenticate, ctrMhs.deleteMhs);

module.exports = routerMhs