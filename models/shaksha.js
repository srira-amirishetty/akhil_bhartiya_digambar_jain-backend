const mongoose = require('mongoose');

const shakshaSchema = new mongoose.Schema({
    title:{type:String},
    description:{type:String},
    images:[{
        type:String
    }]
})

module.exports = mongoose.model('shaksha',shakshaSchema);