const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
    applicant: { type: mongoose.Schema.Types.ObjectId, ref: 'ShayataApplication' },
    typeofeducation:{type:String},
    institutename:{type:String},
    expenditureforyear:{type:Number},
    expectedhelp:{type:Number},
    explainindetail:{type:String},
    images:[{type:String
    }]

})

module.exports = mongoose.model('education',educationSchema);

