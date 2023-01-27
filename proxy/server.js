const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')
const app = express();
const https = require('https');
const fs = require('fs');
const dotenv = require("dotenv")
const session = require('express-session');
const Keycloak = require('keycloak-connect');
const axios = require('axios');
dotenv.config();

const KmsJson = require('kms-json');
  const kmsJson = new KmsJson({
    awsKmsSettings: {
      accessKeyId: `${process.env.ACCESSKEYID}`,
      secretAccessKey: `${process.env.SECRETKEY}`,
      region: 'us-east-1'
      },
        keyId: `${process.env.KEYID}`
      });
  
  
  async function encrypt(sources){
  const CiphertextBlob = await kmsJson.encrypt(sources);
  return CiphertextBlob;
  }
  
  async function decrypt(source) {
  const Plaintext  = await kmsJson.decrypt(source);
  return Plaintext;
  }

var keycloakConfig = {
    realm: 'logrocket',
    bearerOnly: true,
    serverUrl: 'https://34.200.175.161:8443/auth/',
    clientId: 'nodejs-microservice',
   realmPublicKey: `${process.env.REALMPK}`
};
const options = {
	key : fs.readFileSync(`${process.env.KEY}`),
    cert : fs.readFileSync(`${process.env.CERT}`)
};
const httpsAgent = new https.Agent({
        key : fs.readFileSync(`${process.env.KEY}`),
        cert : fs.readFileSync(`${process.env.MYCERT}`)
});
app.use(cors()).use(bodyParser.json()).use(bodyParser.urlencoded({extended : true}));
var memoryStore = new session.MemoryStore();
app.use(session({
    store: memoryStore,
    secret : `${process.env.SECRETKC}`, 
    resave : false , 
    saveUninitialized : true
}));
var keycloak = new Keycloak({
    store : memoryStore,    
},keycloakConfig);
app.use(keycloak.middleware({ 
    logout: '/logout',
    admin: '/'
}));

//1
app.get('/api/meetupn', keycloak.protect(['admin','client']), async (req, res) => {
    await axios.get(`${process.env.PATH_MEETUP}`, {httpsAgent: httpsAgent})
.then(meetups => decrypt(meetups.data).then(result => res.send(result)))
	.catch(err => console.log(err.res))

});

//2
app.get('/api/meetupn/:id', keycloak.protect(['admin','client']), async (req, res) => {
    await axios.get(`${process.env.PATH_MEETUP}${req.params.id}`, {httpsAgent: httpsAgent})
        .then(meetups => decrypt(meetups.data).then(result => res.send(result)))
        .catch(err => console.log(err.res))
});

//3

app.put('/api/meetupn/:id', keycloak.protect('admin'), async (req, res) => {
    encrypt(req.body).then(async function(resul){ 
    await axios.put(`${process.env.PATH_MEETUP}${req.params.id}`, {httpsAgent: httpsAgent, data: resul})
    .then(meetups => res.json(meetups.data))
    .catch(err => console.log(err))})
    .catch(err => console.log(err))
    });

//4

app.delete('/api/meetupn/', keycloak.protect('admin'), async (req, res) => {
    encrypt(req.body).then(async function(resul){
    await axios.delete(`${process.env.PATH_MEETUP}`, {httpsAgent: httpsAgent, data:{id:resul} })
    .then(meetups => res.json(meetups.data))
    .catch(err => console.log(err))})
    .catch(err => console.log(err))
    });       

//5
app.post('/api/meetupn', keycloak.protect('admin'), async (req, res) => {
    encrypt(req.body).then(async function(resul){
    await axios.post(`${process.env.PATH_MEETUP}`, {httpsAgent: httpsAgent, data: resul})
        .then(result => res.json(result.data))
        .catch(err => console.log(err))}).catch(err => console.log(err))});

//USER 6
app.get('/api/user', keycloak.protect(['admin','client']), async (req, res) => {
    encrypt(req.query.name_user).then(async function(resul){
    await axios.get(`${process.env.PATH_USER}`, {httpsAgent: httpsAgent, params:{name_user:resul}})
        .then(meetups => decrypt(meetups.data).then(result => res.send(result)))
        .catch(err => console.log(err.res))})
        .catch(err => console.log(err))
    });

//7
    app.post('/api/user', keycloak.protect(['admin','client']), async (req, res) => {
        encrypt(req.body).then(async function(resul){
        await axios.post(`${process.env.PATH_USER}`, {httpsAgent: httpsAgent, 
        data:{encry:resul}})
            .then(meetups => decrypt(meetups.data).then(result => res.send(result))).catch(err => console.log(err))})
            .catch(err => console.log(err))
    });
const port = process.env.PORT;

//8


app.delete('/api/user/:id', keycloak.protect(['admin','client']), async (req, res) => {
    encrypt(req.body.id_meetup_fav).then(async function(resul){
    await axios.delete(`${process.env.PATH_USER}${req.params.id}`, {httpsAgent: httpsAgent,data:{ id_meetup_fav:resul }})
    .then( () => res.json({
        message: "Deleted meetup successfully"
    }) )})
        .catch(err => console.log(err))});

var httpsServer = https.createServer(options, app);
httpsServer.listen(port);

