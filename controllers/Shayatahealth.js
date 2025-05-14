const healthModal = require('../models/Shayatahealth')
const uploadToCloudinary = require('../config/cloudinary');
const mongoose = require('mongoose'); 

exports.health = async (req,res)  =>  {
    try{

      console.log('Files received:', req.files);

    if (req.files && req.files.length > 0) {
      const imageUrls = await Promise.all(
        req.files.map(file => {
          if (!file.buffer) throw new Error('Missing file buffer');
          return uploadToCloudinary(file.buffer)})
      );
        req.body.images = imageUrls;
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

      console.log('Files received:', req.files);

        const {applicantId} = req.params;

        console.log(applicantId)
      
        if (!applicantId) {
      return res.status(400).json({ error: 'Missing applicantId in request params' });
    }

        if (req.files && req.files.length > 0) {
      const imageUrls = await Promise.all(
        req.files.map(file => {
          if (!file.buffer) throw new Error('Missing file buffer');
          return uploadToCloudinary(file.buffer)})
      );
        req.body.images = imageUrls;
      }

        const updatedhealthData = await healthModal.findOneAndUpdate(
             { applicantId: new mongoose.Types.ObjectId(applicantId) },
            // req.params.id,
            req.body,
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
        const healthData = await healthModal.findOne({applicantId: new mongoose.Types.ObjectId(applicantId)});

        if (!healthData) {
            return res.status(404).json({ message: 'No health data found for this applicant' });
          }

        res.status(200).json(healthData);  
    }catch (error) {
        res.status(400).json({ error: error.message });
      }
}

