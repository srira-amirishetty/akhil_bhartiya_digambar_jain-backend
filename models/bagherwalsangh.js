const mongoose = require('mongoose');

const bagherwalsanghSchema = new mongoose.Schema({
    title:{type:String},
    description:{type:String},
    images:[{
        type:String
    }]
})

module.exports = mongoose.model('bagherwalsangh',bagherwalsanghSchema);