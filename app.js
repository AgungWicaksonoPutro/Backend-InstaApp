require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./src/routes/index')
require('./src/configs/db')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(morgan('dev'));

app.use('/api/v1/instaapp/', routes);
app.use('/uploads', express.static('./upload-img'));

const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log('Server running on port ' + PORT);
})
