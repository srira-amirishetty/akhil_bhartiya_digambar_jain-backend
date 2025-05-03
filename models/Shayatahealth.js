const mongoose = require('mongoose');

const healthSchema = new mongoose.Schema({
    applicant: { type: Schema.Types.ObjectId, ref: 'ShayataApplication' },
    typeofhelp:{type:String},
    nameofdieases:{type:String},
    hospitalname:{type:String},
    expectedexpenses:{type:Number},
    expectedhelp:{type:Number},
    indetail:{type:String},
    images:[{
        data:Buffer,
        contentType:String
    }]
})

module.exports = mongoose.model('health',healthSchema);

