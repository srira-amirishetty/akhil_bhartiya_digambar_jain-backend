const healthModal = require('../models/Shayatahealth')

exports.health = async (req,res)  =>  {
    try{
    const data = req.body;

    req.body.img = {
        data:req.file.buffer,
        contentType:req.file.mimetype
    } 

    if (req.files && req.files.length > 0) {
        req.body.images = req.files.map(file => ({
          data: file.buffer,
          contentType: file.mimetype
        }));
      }

    const healthData = new healthModal(req.body)
    await healthData.save()
    res.status(201).send(healthData)
}catch (error){
    res.status(400).json({error:error.message})
}
};

exports.updatehealthByApplicant = async (req,res) => {
    try{

        const {applicantId} = req.params;

        const updateData = {...req.body};

        if (req.files && req.files.length > 0) {
            updateData.images = req.files.map(file => ({
              data: file.buffer,
              contentType: file.mimetype
            }));
          }

        const updatedhealthData = await healthModal.findByIdAndUpdate(
            {applicant:applicantId},
            updateData,
            {new:true}
        );
        if (!updatedhealthData) {
            return res.status(404).json({ message: 'Health record not found for applicant' });
          }
        res.status(200).json(updatedhealthData)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

exports.gethealthbyApplicant = async (req,res) => {
    try{
        const {applicantId} = req.params;
        const healthData = await healthModal.findOne({applicant:applicantId});

        if (!healthData) {
            return res.status(404).json({ message: 'No health data found for this applicant' });
          }

        res.status(200).json(healthData);  
    }catch (error) {
        res.status(400).json({ error: error.message });
      }
}

