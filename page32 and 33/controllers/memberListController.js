const Member = require('../models/Member');

exports.getAllMembers = async (req, res) => {
  const members = await Member.find({}, 'fullName mobile city');
  res.json(members);
};

exports.getMemberById = async (req, res) => {
  const member = await Member.findById(req.params.id);
  res.json(member);
};

exports.addMember = async (req, res) => {
  const { fullName, mobile, city } = req.body;

  const newMember = new Member({
    fullName,
    mobile,
    city
  });

  if (req.file) {
    newMember.profilePic = {
      data: req.file.buffer,
      contentType: req.file.mimetype
    };
  }

  await newMember.save();
  res.status(201).json({ message: 'Member added', id: newMember._id });
};

exports.getProfilePic = async (req, res) => {
  const member = await Member.findById(req.params.id);
  if (member && member.profilePic && member.profilePic.data) {
    res.set('Content-Type', member.profilePic.contentType);
    return res.send(member.profilePic.data);
  } else {
    res.status(404).send('Image not found');
  }
};