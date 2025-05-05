const PersonalInfo = require('../models/PersonalInfo');
const BusinessInfo = require('../models/BusinessInfo');
const OtherInfo = require('../models/OtherInfo');

const checkVerification = async (personalId) => {
  const person = await PersonalInfo.findById(personalId);
  if (!person) throw new Error('Member not found');
  if (!person.isPhoneVerified) throw new Error('Phone number is not verified');
  return person;
};

exports.updatePersonalInfo = async (req, res) => {
  try {
    const { id } = req.params; // personalId
    await checkVerification(id);

    const updated = await PersonalInfo.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.updateBusinessInfo = async (req, res) => {
  try {
    const { id } = req.params; // personalId
    await checkVerification(id);

    const updated = await BusinessInfo.findOneAndUpdate({ personalId: id }, req.body, { new: true });
    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.updateOtherInfo = async (req, res) => {
  try {
    const { id } = req.params; // personalId
    await checkVerification(id);

    const updated = await OtherInfo.findOneAndUpdate({ personalId: id }, req.body, { new: true });
    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
