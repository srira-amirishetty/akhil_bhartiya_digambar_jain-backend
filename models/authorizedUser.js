const mongoose = require('mongoose');

const authorizedUserSchema = new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String},
    contact:{type:Number},
    role:{type:String},
    img:{data:Buffer,
        contentType:String
    }
})

module.exports = mongoose.model('authorizedUser',authorizedUserSchema);