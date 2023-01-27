const dotenv = require("dotenv")
dotenv.config()
const crypto = require('crypto');
const mongoose = require('mongoose');
const connection = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.snp9s.mongodb.net/appDB?retryWrites=true&w=majority`;

mongoose.connect(connection,{ useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("Database Connected Successfully"))
    .catch(err => console.log(err));


module.exports = connection;
