const  connection  = require('../database');
const { response } = require('express');
const express = require('express');
const { findOneAndUpdate, findByIdAndUpdate } = require('../models/userModel');
const router = express.Router()
const KMS = require('aws-sdk');
const KmsJson = require('kms-json');
var MongoClient = require('mongodb').MongoClient;
const user =require("../models/userModel");

const dotenv = require("dotenv");
dotenv.config();

const url = connection;



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
    decrypt(req.query.name_user).then(resul => 
	user.find({name_user: resul},function(err,item){
        if(err)throw err;
        encrypt(item)
        .then(dat =>
         res.send(dat)
         )
        }).clone().catch(err => console.log(err))
).catch(err => console.log(err))
        })


router.delete('/:id',function(req,res){
    decrypt(req.body.id_meetup_fav).then(resul => 
    user.findByIdAndUpdate( req.params.id, 
        { $pull:{ id_meetup_fav: resul }} , function(err, node) {
        if (err) { return handleError(res, err); }

        res.json({
            message: "Deleted meetup successfully"
        })
    
    }).clone().catch(err => console.log(err))
    ).catch(err => console.log(err));
})

router.post('/', (req, res) => {
    decrypt(req.body.data.encry).then(function(resul){
const {name_user,id_meetup_fav} = resul;
    user.find({name_user:name_user},function(err,tem){
        if(!tem.length){
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db("appDB");
                var myobj = { name_user: name_user, id_meetup_fav:[id_meetup_fav]};
                dbo.collection("users").insertOne( myobj, function(err, response) {
                  if (err) throw err;
                  db.close();
                  encrypt(response).then(dat =>
                  res.send(dat))
                });
              });
              
        }else{
            user.find({name_user: name_user,id_meetup_fav:id_meetup_fav},function(err,item){
                if(err)throw err;
                if(item.length){
                    encrypt(item).then(function(dat){
                    return res.send(dat)});
                }else{
                    user.updateOne({_id:tem[0]._id},{$push:{id_meetup_fav:id_meetup_fav}},function(err, doc) {
                        if (err) throw err;
                        encrypt(doc).then(function(dat){
                        return res.send(dat)});
                    });
                }
            })
        }
    })
})
})


module.exports = router 
