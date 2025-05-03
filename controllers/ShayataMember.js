const ShayataApplication = require('../models/ShayataMember');

// Create a new application (Step 1 only)
exports.createApplication = async (req, res) => {
  try {
    const data = req.body;

    const profileImage = req.files['applicantImage']?.[0];
    const coverImage = req.files['beneficiaryImage']?.[0];

    req.body.applicantImage = {
        data: profileImage.buffer,
        contentType: profileImage.mimetype,
      };
  
      req.body.beneficiaryImage = {
        data: coverImage.buffer,
        contentType: coverImage.mimetype,
      };

    const app = new ShayataApplication(req.body);
    const savedApp = await app.save();
    res.status(201).json(savedApp);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update existing application
exports.updateApplication = async (req, res) => {
  try {
    const profileImage = req.files['applicantImage']?.[0];
    const coverImage = req.files['beneficiaryImage']?.[0];

    if(profileImage){
      req.body.applicantImage = {
        data: profileImage.buffer,
        contentType: profileImage.mimetype,
      };
    }
  
    if(coverImage){
      req.body.beneficiaryImage = {
        data: coverImage.buffer,
        contentType: coverImage.mimetype,
      };
    }


    const updated = await ShayataApplication.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get application by ID
exports.getApplicationById = async (req, res) => {
  try {
    const app = await ShayataApplication.findById(req.params.id);
    res.json(app);
  } catch (error) {
    res.status(404).json({ error: 'Application not found' });
  }
};
