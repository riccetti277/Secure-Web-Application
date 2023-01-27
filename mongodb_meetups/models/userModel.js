const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    id_user:{
        type:String,
        required:false
    },
    name_user:{
        type:String,
        required:true,
    },
    id_meetup_fav: [{
        type: Array,
        required: false
    }], 
})
module.exports = mongoose.model("user", userSchema, "users")