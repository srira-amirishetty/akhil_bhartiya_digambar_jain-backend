const Member = require('../models/AddMember');

// Create Member
exports.createMember = async (req, res) => {
  try {
    const {
      qualification,
      aadhaar,
      pan,
      mediclaimPolicy,
      termInsurance,
      lifeInsurance,
      socialPost
    } = req.body;

    const imgData = req.files?.image?.data;
    const imgMime = req.files?.image?.mimetype;

    const newMember = new Member({
      qualification,
      aadhaar,
      pan,
      mediclaimPolicy,
      termInsurance,
      lifeInsurance,
      socialPost,
      image: {
        data: imgData,
        contentType: imgMime,
      }
    });

    await newMember.save();
    res.status(201).json({ message: 'Member added successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server Error', details: err.message });
  }
};

// Get All Members
exports.getAllMembers = async (req, res) => {
  try {
    const members = await Member.find({}, '-image');
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// Serve Image
exports.getImage = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member || !member.image?.data) {
      return res.status(404).send('Image not found');
    }

    res.contentType(member.image.contentType);
    res.send(member.image.data);
  } catch (err) {
    res.status(500).json({ error: 'Error loading image' });
  }
};
