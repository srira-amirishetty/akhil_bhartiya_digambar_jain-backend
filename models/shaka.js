const mongoose = require('mongoose');

const shakaSchema = new mongoose.Schema({
    title:{type:String},
    description:{type:String},
    images:[{
        type:String
    }]
})

module.exports = mongoose.model('shaka',shakaSchema);