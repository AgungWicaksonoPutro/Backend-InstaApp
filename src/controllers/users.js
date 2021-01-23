const users = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const helpers = require('../helpers/response');
const { userActivate } = require('../middlewares/mailer')


module.exports = {
    register:(req, res)=>{
        const {name, email, password} = req.body;
        const data ={
            name,
            email,
            password,
            isActive: false,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        users.find({email}, (err, result)=>{
            if(err) return console.log(err)
            if(result.length >= 1) return helpers.response(res, {msg: 'Email Is Already!'}, 200, null) 
            bcrypt.genSalt(10, (err, salt)=>{
                bcrypt.hash(data.password, salt, (err, hash)=>{
                    data.password = hash
                    const register = new users(data);
                    register.save()
                        .then(result=>{
                            userActivate(result.email)
                                .then(()=>{
                                    const registered = {
                                        _id : result._id,
                                        msg : 'Success! Cek Email To Activation..'
                                    }
                                    helpers.response(res, registered, 200, null);
                                })
                                .catch(err=>{
                                    console.log(err)
                                })
                        })
                        .catch(err=>{
                            console.log(err)
                        })
                })
            })
        })
    },
    login:(req, res)=>{
        const {email, password} = req.body
        users.findOne({email}, (err, result)=>{
            if(err) console.log(err)
            if(result === null) return helpers.response(res, {msg: 'Email Not Found!'}, 200, null)
            if(!result.isActive) return helpers.response(res, {msg: 'Please Actived Your Mail!'}, 200, null)
            const user = result
            const hash = user.password
            bcrypt.compare(password, hash)
                .then(compare=>{
                    if(!compare) return helpers.response(res, {msg: 'Password Wrong!'}, 200, null)
                    const payload = {
                        id: user._id,
                        email: user.email,
                        isActive: user.isActive
                    }
                    jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '1h'}, (err, token)=>{
                        if(err) return console.log(err)
                        const result = {
                            _id: user._id,
                            name: user.name,
                            token: token
                        }
                        helpers.response(res, result, 200, null)
                    })
                }) 
        })
    }
}