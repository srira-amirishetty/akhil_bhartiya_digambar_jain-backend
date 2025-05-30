const mongoose = require('mongoose');

const bagherwalmandalSchema = new mongoose.Schema({
    title:{type:String},
    description:{type:String},
    images:[{
        type:String
    }]
})

module.exports = mongoose.model('bagherwalmandal',bagherwalmandalSchema);