const bagerwalSamajTrustModal = require('../models/bagerwalSamajTrust')
const uploadToCloudinary = require('../config/cloudinary'); 

exports.bagerwalSamajTrust = async (req,res)  =>  {
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

    const bagerwalSamajTrustData = new bagerwalSamajTrustModal(req.body)
    await bagerwalSamajTrustData.save()
    res.status(201).send(bagerwalSamajTrustData)
}catch (error){
    res.status(400).json({error:error.message})
}
};

exports.updatebagerwalSamajTrustByApplicant = async (req,res) => {
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

        const updatedbagerwalSamajTrustData = await bagerwalSamajTrustModal.findByIdAndUpdate(
             id,
            // req.params.id,
            req.body,
            {new:true}
        );
        if (!updatedbagerwalSamajTrustData) {
            return res.status(404).json({ message: 'bagerwalSamajTrust record not found for applicant' });
          }
        res.status(200).json(updatedbagerwalSamajTrustData)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

exports.getbagerwalSamajTrustbyApplicant = async (req,res) => {
    try{
        const {id} = req.params;
        const bagerwalSamajTrustData = await bagerwalSamajTrustModal.findById(id);

        if (!bagerwalSamajTrustData) {
            return res.status(404).json({ message: 'No bagerwalSamajTrust data found for this applicant' });
          }

        res.status(200).json(bagerwalSamajTrustData);  
    }catch (error) {
        res.status(400).json({ error: error.message });
      }
}

exports.getbagerwalSamajTrusts = async (req, res) => {
  try {
    const limit = 5;
    const page = parseInt(req.query.page) || 1;
    const search = req.query.search || "";

    const query = search ? {
        title:{ $regex: search, $options: 'i' }      
    }:{};

    const total = await bagerwalSamajTrustModal.countDocuments(query);
    

    const sanstas = await bagerwalSamajTrustModal.find(query).select('title -_id').skip((page-1)*limit).limit(limit);

    
    res.status(201).json({data:sanstas,page,totalPages: Math.ceil(total/limit) });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
  };

    exports.deleteItemById = async (req,res) => {
    try {
        const { id } = req.params;
    
        const member = await bagerwalSamajTrustModal.findByIdAndDelete(id);
    
        if (!member) {
          return res.status(404).json({ message: "bagerwalSamajTrust not found" });
        }
    
        res.status(200).json({ message:"bagerwalSamajTrust deleted successfully" });
      } catch (error) {
        res.status(500).json({ err: error.message });
      }
  }