const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')
var app = express();
const https = require('https');
const fs = require('fs');

const dotenv = require("dotenv")
dotenv.config()
const options = {
	key : fs.readFileSync(`${process.env.KEY}`),
	cert : fs.readFileSync(`${process.env.CERT}`),
	ca : fs.readFileSync(`${process.env.CHAIN}`)
};



require('./database');

app.use(bodyParser.json());
app.use(cors());

// API
const meetups = require('./api/meetupn');
app.use('/api/meetupn', meetups);

const users=require('./api/user');
app.use('/api/user',users);

app.use(express.static(path.join(__dirname, '../build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build'))
})


const port = process.env.PORT;

var httpsServer = https.createServer(options, app);
httpsServer.listen(port);


