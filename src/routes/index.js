const express = require('express');
const route = express.Router();
const userRoute = require('./users')


route
    .use('/users', userRoute)

module.exports = route;