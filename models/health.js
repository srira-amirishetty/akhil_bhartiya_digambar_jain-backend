const mongoose = require('mongoose');

const healthSchema = new mongoose.Schema({
    typeofhelp:{type:String},
    nameofdieases:{type:String},
    hospitalname:{type:String},
    expectedexpenses:{type:Number},
    expectedhelp:{type:Number},
    indetail:{type:String},
    img:{
        data:Buffer,
        contentType:String
    }
})

module.exports = mongoose.model('health',healthSchema);

