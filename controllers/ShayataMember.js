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
    res.status(201).json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get application by ID
exports.getApplicationById = async (req, res) => {
  try {
    const applicant = await ShayataApplication.findById(req.params.id);
    res.status(201).json(applicant);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};


//  get all applicants data route 

exports.getAllApplications = async (req, res) => {
  try{
    const applications = await ShayataApplication.find()
    res.status(201).json(applications)
  }catch (error){
    res.status(404).json({error:error.message})
  }
}

exports.searchApplicantByName = async (req,res) => {
  try{
    
    const search = req.query.search || "";

      const query={}
  
      if(search){query.name = { $regex: search, $options: 'i' }};
  
    const members = await ShayataApplication.find(query)

    res.status(201).json({data:members});

  }catch(error){
    res.status(404).json({error:error.message})
  }
}

