const Member = require('../models/Member');

exports.searchMembers = async (req, res) => {
  const { name } = req.query;
  const members = await Member.find({
    fullName: { $regex: name, $options: 'i' }
  });
  res.json(members);
};

exports.getMemberById = async (req, res) => {
  const member = await Member.findById(req.params.id);
  res.json(member);
};

exports.updateDOB = async (req, res) => {
  const { birthDate } = req.body;
  const updated = await Member.findByIdAndUpdate(
    req.params.id,
    { birthDate },
    { new: true }
  );
  res.json(updated);
};