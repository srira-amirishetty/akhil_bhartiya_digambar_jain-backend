const mongoose = require('mongoose');

const jainLiteratureSchema = new mongoose.Schema({
    title:{type:String},
    description:{type:String},
    images:[{
        type:String
    }],
    type:String
})

module.exports = mongoose.model('jainLiterature',jainLiteratureSchema);