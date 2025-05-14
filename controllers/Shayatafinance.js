const financeModal = require('../models/Shayatafinance')
const uploadToCloudinary = require('../config/cloudinary');
const mongoose = require('mongoose');

exports.finance = async (req,res)  =>  {
    try{

    if (req.files && req.files.length > 0) {
    const imageUrls = await Promise.all(
    req.files.map(file => {
    if(!file.buffer) throw new Error("Missing file buffer")
    return uploadToCloudinary(file.buffer)
    })
    );
        req.body.images = imageUrls;
      }

    const financeData = new financeModal(req.body)
    await financeData.save()
    res.status(201).send(financeData)
}catch (error){
    res.status(400).json({error:error.message})
}
};

exports.updatefinanceByApplicant = async (req,res) => {
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

        const updatedfinanceData = await financeModal.findOneAndUpdate(
            {applicant: new mongoose.Types.ObjectId(applicantId)},
            req.body,
            {new:true}
        );
        if (!updatedfinanceData) {
            return res.status(404).json({ message: 'Finance record not found for applicant' });
          }
        res.status(200).json(updatedfinanceData)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

exports.getfinancebyApplicant = async (req,res) => {
    try{
        const {applicantId} = req.params;
        const financeData = await financeModal.findOne({applicant:new mongoose.Types.ObjectId(applicantId)});

        if (!financeData) {
            return res.status(404).json({ message: 'No finance data found for this applicant' });
          }

        res.status(200).json(financeData);  
    }catch (error) {
        res.status(400).json({ error: error.message });
      }
}

