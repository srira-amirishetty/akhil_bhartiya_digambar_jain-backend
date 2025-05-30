const jainmandirModal = require('../models/jainmandir')
const uploadToCloudinary = require('../config/cloudinary'); 

exports.jainmandir = async (req,res)  =>  {
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

    const jainmandirData = new jainmandirModal(req.body)
    await jainmandirData.save()
    res.status(201).send(jainmandirData)
}catch (error){
    res.status(400).json({error:error.message})
}
};

exports.updatejainmandirByApplicant = async (req,res) => {
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

        const updatedjainmandirData = await jainmandirModal.findByIdAndUpdate(
             id,
            // req.params.id,
            req.body,
            {new:true}
        );
        if (!updatedjainmandirData) {
            return res.status(404).json({ message: 'jainmandir record not found for applicant' });
          }
        res.status(200).json(updatedjainmandirData)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

exports.getjainmandirbyApplicant = async (req,res) => {
    try{
        const {id} = req.params;
        const jainmandirData = await jainmandirModal.findById(id);

        if (!jainmandirData) {
            return res.status(404).json({ message: 'No jainmandir data found for this applicant' });
          }

        res.status(200).json(jainmandirData);  
    }catch (error) {
        res.status(400).json({ error: error.message });
      }
}

exports.getjainmandirs = async (req, res) => {
  try {
    const limit = 5;
    const page = parseInt(req.query.page) || 1;
    const search = req.query.search || "";

    const query = search ? {
        title:{ $regex: search, $options: 'i' }      
    }:{};

    const total = await jainmandirModal.countDocuments(query);
    

    const jainmandirs = await jainmandirModal.find(query).select('title -_id').skip((page-1)*limit).limit(limit);

    
    res.status(201).json({data:jainmandirs,page,totalPages: Math.ceil(total/limit) });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
  };

    exports.deleteItemById = async (req,res) => {
    try {
        const { id } = req.params;
    
        const member = await jainmandirModal.findByIdAndDelete(id);
    
        if (!member) {
          return res.status(404).json({ message: "jainmandir not found" });
        }
    
        res.status(200).json({ message:"jainmandir deleted successfully" });
      } catch (error) {
        res.status(500).json({ err: error.message });
      }
  }