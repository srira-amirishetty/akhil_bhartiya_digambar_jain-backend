const newsupdateModal = require('../models/newsupdate')
const uploadToCloudinary = require('../config/cloudinary'); 

exports.newsupdate = async (req,res)  =>  {
    try{

      // console.log('Files received:', req.files);

    if (req.files && req.files.length > 0) {
      const imageUrls = await Promise.all(
        req.files.map(file => {
          if (!file.buffer) throw new Error('Missing file buffer');
          return uploadToCloudinary(file.buffer)})
      );
        req.body.images = imageUrls;
      }

    const newsupdateData = new newsupdateModal(req.body)
    await newsupdateData.save()
    res.status(201).send(newsupdateData)
}catch (error){
    res.status(400).json({error:error.message})
}
};

exports.updatenewsupdateByApplicant = async (req,res) => {
    try{

      // console.log('Files received:', req.files);

        const {id} = req.params;

        // console.log(applicantId)
      
        if (!id) {
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

        const updatednewsupdateData = await newsupdateModal.findOneAndUpdate(
             {id},
            // req.params.id,
            req.body,
            {new:true}
        );
        if (!updatednewsupdateData) {
            return res.status(404).json({ message: 'record not found for applicant' });
          }
        res.status(200).json(updatednewsupdateData)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

exports.getnewsupdatebyApplicant = async (req,res) => {
    try{
        const {id} = req.params;
        const newsupdateData = await newsupdateModal.findOne({id});

        if (!newsupdateData) {
            return res.status(404).json({ message: 'No data found for this applicant' });
          }

        res.status(200).json(newsupdateData);  
    }catch (error) {
        res.status(400).json({ error: error.message });
      }
}

