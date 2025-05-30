const mongoose = require('mongoose');

const financeSchema = new mongoose.Schema({
    applicant: { type: mongoose.Schema.Types.ObjectId, ref: 'ShayataApplication' },
    employeetype:{type:String},
    reasonofhelp:{type:String},
    expectedhelp:{type:Number},
    explainindetail:{type:String},
    images:[{type:String}]
})

module.exports = mongoose.model('finance',financeSchema);

