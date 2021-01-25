require('dotenv').config();
const nodemailer = require('nodemailer');
const template = require('./mailTemplate')

const transporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    auth: {
        user: process.env.SERVICE_MAIL,
        pass: process.env.SERVICE_PASS
    }
});

module.exports = {
    userActivate: (email, token)=>{
        return new Promise((resolve, reject)=>{
            const url = `${process.env.BASE_URL_FRONTEND}/verify-account?token=${token}`
            const mailOptions = {
                from: process.env.SERVICE_MAIL,
                to: email,
                subject: 'New Regristration',
                html: template.template(url, 'Confirm')
            }
            transporter.sendMail(mailOptions, (err, info)=>{
                if(err) return reject(err)
                else return resolve(info.response)
            })
        })
    }
}