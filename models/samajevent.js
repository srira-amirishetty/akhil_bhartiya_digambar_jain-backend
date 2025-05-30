const mongoose = require('mongoose');

const samajeventSchema = new mongoose.Schema({
    title:{type:String},
    description:{type:String},
    images:[{
        type:String
    }]
})

module.exports = mongoose.model('samajevent',samajeventSchema);