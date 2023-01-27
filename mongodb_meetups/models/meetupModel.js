const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const meetupSchema = new Schema({
    id:{
        type:String,
        required:false
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
   address: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model("meetup", meetupSchema, "meetups")