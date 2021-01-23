require('dotenv').config();
const jwt = require('jsonwebtoken');
const helpers = require('../helpers/response');

module.exports = {
    verifyAccess: (req, res, next)=>{
        let token = req.headers.authorization
        token = token.split(" ")[1]
        jwt.verify(token, process.env.SECRET_KEY, (err)=>{
            if(err){
                if(err.name === 'JsonWebTokenError') return helpers.response(res, {msg: 'Token Invalid!'}, 403, null)
                else if (err.name === 'TokenExpiredError') return helpers.response(res, {msg: 'Token Expired!'}, 403, null)
                else return helpers.response(res, null, 403, err)
            }
            next()
        })
    }
}