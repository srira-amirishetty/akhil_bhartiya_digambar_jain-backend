const sanstaModal = require('../models/sansta')
const uploadToCloudinary = require('../config/cloudinary'); 

exports.sansta = async (req,res)  =>  {
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

    const sanstaData = new sanstaModal(req.body)
    await sanstaData.save()
    res.status(201).send(sanstaData)
}catch (error){
    res.status(400).json({error:error.message})
}
};

exports.updatesanstaByApplicant = async (req,res) => {
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

        const updatedsanstaData = await sanstaModal.findOneAndUpdate(
             {id},
            // req.params.id,
            req.body,
            {new:true}
        );
        if (!updatedsanstaData) {
            return res.status(404).json({ message: 'Health record not found for applicant' });
          }
        res.status(200).json(updatedsanstaData)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

exports.getsanstabyApplicant = async (req,res) => {
    try{
        const {id} = req.params;
        const sanstaData = await sanstaModal.findOne({id});

        if (!sanstaData) {
            return res.status(404).json({ message: 'No health data found for this applicant' });
          }

        res.status(200).json(sanstaData);  
    }catch (error) {
        res.status(400).json({ error: error.message });
      }
}

