const express = require('express');
const router = express.Router();
const controllerUser = require('../controllers/users')


router
    .post('/register', controllerUser.register)
    .post('/login', controllerUser.login)

module.exports = router;