const express = require('express');
const router = express.Router();

const userControler = require('./controlers/user.controler.js');

router.get('/login', userControler.get_login());
router.post('/post');
router.get('/logout');

module.exports = router;