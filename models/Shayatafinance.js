const mongoose = require('mongoose');

const financeSchema = new mongoose.Schema({
    applicant: { type: mongoose.Schema.Types.ObjectId, ref: 'ShayataApplication' },
    typeofhelp:{type:String},
    employeetype:{type:String},
    typeofhelp:{type:String},
    expectedexpenses:{type:Number},
    expectedhelp:{type:Number},
    indetail:{type:String},
    images:[{type:String}]
})

module.exports = mongoose.model('finance',financeSchema);

