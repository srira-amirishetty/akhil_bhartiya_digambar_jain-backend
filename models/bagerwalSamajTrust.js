const mongoose = require('mongoose');

const bagerwalSamajTrustSchema = new mongoose.Schema({
    title:{type:String},
    description:{type:String},
    images:[{
        type:String
    }]
})

module.exports = mongoose.model('bagerwalSamajTrust',bagerwalSamajTrustSchema);