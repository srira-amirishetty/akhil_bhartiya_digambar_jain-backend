const PersonalInfo = require('../models/PersonalInfo');
const BusinessInfo = require('../models/BusinessInfo');
const OtherInfo = require('../models/OtherInfo');

// Step 1: Save Personal Info
exports.savePersonalInfo = async (req, res) => {
  try {
    const personalInfo = new PersonalInfo(req.body);
    await personalInfo.save();
    res.status(201).json({ message: 'Personal info saved successfully', memberId: personalInfo._id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save personal info', details: error.message });
  }
};

// Step 2: Save Business Info
exports.saveBusinessInfo = async (req, res) => {
  try {
    const businessInfo = new BusinessInfo(req.body);
    await businessInfo.save();
    res.status(201).json({ message: 'Business info saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save business info', details: error.message });
  }
};

// Step 3: Save Other Info
exports.saveOtherInfo = async (req, res) => {
  try {
    const otherInfo = new OtherInfo(req.body);
    await otherInfo.save();
    res.status(201).json({ message: 'Other info saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save other info', details: error.message });
  }
};

// get members
exports.getMembers = async (req, res) => {
  try {
    const limit = 10;
    const page = parseInt(req.query.page) || 1;
    const search = req.query.search || "";

    const query = search ? {
      $or:[
        {firstName:{ $regex: search, $options: 'i' }},
        { middleName: { $regex: search, $options: 'i' } },
        { surname: { $regex: search, $options: 'i' } }
      ]
    }:{};

    const total = await PersonalInfo.countDocuments(query);
    

    const members = await PersonalInfo.find(query).skip((page-1)*limit).limit(limit);

    
    res.status(201).json({data:members,page,totalPages: Math.ceil(total/limit) });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};
