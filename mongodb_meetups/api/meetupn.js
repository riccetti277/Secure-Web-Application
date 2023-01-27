const express = require('express');
const router = express.Router()
const KMS = require('aws-sdk');
const KmsJson = require('kms-json');
const dotenv = require("dotenv");
dotenv.config();
const meetup =require("../models/meetupModel")

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

router.get('/', (req, res) => {
    meetup.find()
        .then(meetups => encrypt(meetups).then(crypt => res.json(crypt)))
        .catch(err => console.log(err))
})

router.get('/:id', (req, res) => {
    meetup.findById(req.params.id)
    .then(meetups => encrypt(meetups).then(crypt => res.json(crypt)))
    .catch(err => console.log(err))
})

router.put('/:id',function(req,res){
    decrypt(req.body.data).then(body => 
    meetup.findByIdAndUpdate(req.params.id,body)
    .then(() => res.json({
        message: "Created meetup successfully"
    })))
    .catch(err => console.log(err)) 
})


router.delete('/',function(req,res){
    decrypt(req.body.id).then(body => 
    meetup.findByIdAndRemove(body.id)
	 .then(() => res.json({
        message: "Created meetup successfully"
    })))
    .catch(err => console.log(err)) 
})


router.post('/', (req, res) => {
    decrypt(req.body.data).then(function(resul){

    const {title,address,description,image} = resul;
    const newMeetup = new meetup({
        title: title,
        image:image,
        address:address,
        description:description, 
    })
    newMeetup.save()
        .then(() => res.send({
            message: "Created meetup successfully"
        }))
        .catch(err => res.status(400).json({
            "error": err,
            "message": "Error creating meetup"
        }))
})})

module.exports = router 
