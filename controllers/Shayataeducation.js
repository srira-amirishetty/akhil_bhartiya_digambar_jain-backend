const educationModal = require('../models/Shayataeducation')
const uploadToCloudinary = require('../config/cloudinary');
const mongoose = require('mongoose');

exports.education = async (req,res)  =>  {
    try{
    //  console.log('Files received:', req.files);

    if (req.files && req.files.length > 0) {
      const imageUrls = await Promise.all(
        req.files.map(file => {
          if (!file.buffer) throw new Error('Missing file buffer');
          return uploadToCloudinary(file.buffer)})
      );
        req.body.images = imageUrls;
      }

    const educationData = new educationModal(req.body)
    await educationData.save()
    res.status(201).send(educationData)
}catch (error){
    res.status(400).json({error:error.message})
}
};

exports.updateeducationByApplicant = async (req,res) => {
    try{

        const {applicantId} = req.params;

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

        const updatededucationData = await educationModal.findOneAndUpdate(
            {applicant: new mongoose.Types.ObjectId(applicantId)},
            req.body,
            {new:true}
        );
        if (!updatededucationData) {
            return res.status(404).json({ message: 'Health record not found for applicant' });
          }
        res.status(200).json(updatededucationData)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

exports.geteducationbyApplicant = async (req,res) => {
    try{
        const {applicantId} = req.params;
        const educationData = await educationModal.findOne({applicant:new mongoose.Types.ObjectId(applicantId)});

        if (!educationData) {
            return res.status(404).json({ message: 'No education data found for this applicant' });
          }

        res.status(200).json(educationData);  
    }catch (error) {
        res.status(400).json({ error: error.message });
      }
}

