const shakshaModal = require('../models/shaksha')
const uploadToCloudinary = require('../config/cloudinary'); 

exports.shaksha = async (req,res)  =>  {
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

    const shakshaData = new shakshaModal(req.body)
    await shakshaData.save()
    res.status(201).send(shakshaData)
}catch (error){
    res.status(400).json({error:error.message})
}
};

exports.updateshakshaByApplicant = async (req,res) => {
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

        const updatedshakshaData = await shakshaModal.findOneAndUpdate(
             {id},
            // req.params.id,
            req.body,
            {new:true}
        );
        if (!updatedshakshaData) {
            return res.status(404).json({ message: 'Health record not found for applicant' });
          }
        res.status(200).json(updatedshakshaData)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

exports.getshakshabyApplicant = async (req,res) => {
    try{
        const {id} = req.params;
        const shakshaData = await shakshaModal.findOne({id});

        if (!shakshaData) {
            return res.status(404).json({ message: 'No health data found for this applicant' });
          }

        res.status(200).json(shakshaData);  
    }catch (error) {
        res.status(400).json({ error: error.message });
      }
}

