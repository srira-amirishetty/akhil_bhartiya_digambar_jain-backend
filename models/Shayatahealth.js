const mongoose = require('mongoose');

const healthSchema = new mongoose.Schema({
    applicantId: { type: mongoose.Schema.Types.ObjectId, ref: 'ShayataApplication', required:true },
    typeofhelp:{type:String},
    nameofdieases:{type:String},
    hospitalname:{type:String},
    expectedexpenses:{type:Number},
    expectedhelp:{type:Number},
    indetail:{type:String},
    images:[{
        type:String
    }]
})

module.exports = mongoose.model('health',healthSchema);

