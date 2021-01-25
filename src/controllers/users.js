const users = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const helpers = require('../helpers/response');
const { userActivate } = require('../middlewares/mailer')


module.exports = {
    register: async (req, res)=>{
        try {
            const {name, email, password} = req.body;
            const data ={
                name,
                email,
                password,
                isActive: false,
                createdAt: new Date(),
                updatedAt: new Date()
            }
            await users.find({email}, (err, result)=>{
                if(err) return console.log(err)
                if(result.length >= 1) return helpers.response(res, {msg: 'Email Is Already!'}, 200, null) 
                bcrypt.genSalt(10, (err, salt)=>{
                    bcrypt.hash(data.password, salt, (err, hash)=>{
                        data.password = hash
                        const register = new users(data);
                        register.save()
                            .then(result=>{
                                const payload = {
                                    _id: result._id,
                                    email: result.email
                                }
                                jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '10'}, (err, token)=>{
                                    if(err) return console.log(err)
                                    console.log(token)
                                    userActivate(result.email, token)
                                    .then(()=>{
                                        const registered = {
                                            _id : result._id,
                                            msg : 'Success! Cek Email To Activation.. Note: Check spam if the inbox does not exist!'
                                        }
                                        helpers.response(res, registered, 200, null);
                                        })
                                        .catch(err=>{
                                            console.log(err)
                                        })
                                })
                            })
                            .catch(err=>{
                                console.log(err)
                            })
                    })
                })
            })
        } catch (err){
            console.log(err)
        }
    },
    login: async (req, res)=>{
        try {
            const {email, password} = req.body
            await users.findOne({email}, (err, result)=>{
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
                        jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '5h'}, (err, token)=>{
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
        } catch (err) {
            console.log(err)
        }
    },
    verifyAccount: async (req, res)=>{
        try{
            const _id = req.body
            const payload = {
                isActive: true,
                updatedAt: new Date()
            }
            await users.findByIdAndUpdate(_id, payload, (err, result)=>{
                if(err) return helpers.response(res, null, 500, err)
                helpers.response(res, {_id: result._id, msg: 'Thanks for Activation'}, 200, null)
            })
        } catch (err){
            console.log(err)
        }
    },
    getUserById: async (req, res)=>{
        try{
            const id = req.params
            await users.findById(id, (err, result)=>{
                if(err) return helpers.response(res, null, 500, err)
                const resData = {
                    _id: result._id,
                    name: result.name,
                    email: result.email
                }
                helpers.response(res, resData, 200, null)
            })
        } catch (err) {
            console.log(err)
        }
    }
}