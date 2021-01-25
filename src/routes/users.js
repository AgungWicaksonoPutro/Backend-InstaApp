const express = require('express');
const router = express.Router();
const controllerUser = require('../controllers/users')
const { verifyActived, verifyAccess } = require('../middlewares/auth')


router
    .post('/register', controllerUser.register)
    .post('/login', controllerUser.login)
    .patch('/verify-access', verifyActived, controllerUser.verifyAccount)
    .get('/:_id', verifyAccess, controllerUser.getUserById)

module.exports = router;