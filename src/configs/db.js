require('dotenv').config();
const mongoose = require('mongoose');
const HOST = process.env.HOST;

mongoose.connect(
    HOST,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    },
    err=>{
        if(err) throw err;
        console.log('db connected..');
    }
);
mongoose.set('useCreateIndex', true);