const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const DropDownSchema = new Schema({
  sansta: [String],
  shakha:[String]
});
const DropDownModal = model('DropDown', DropDownSchema);


module.exports = DropDownModal;
