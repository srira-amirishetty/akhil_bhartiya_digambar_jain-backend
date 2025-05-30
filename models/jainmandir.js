const mongoose = require('mongoose');

const jainmandirSchema = new mongoose.Schema({
    title:{type:String},
    description:{type:String},
    images:[{
        type:String
    }]
})

module.exports = mongoose.model('jainmandir',jainmandirSchema);