const mongoose = require('mongoose');

const membereventSchema = new mongoose.Schema({
    title:{type:String},
    description:{type:String},
    images:[{
        type:String
    }]
})

module.exports = mongoose.model('memberevent',membereventSchema);