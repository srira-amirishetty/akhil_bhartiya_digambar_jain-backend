const bagherwalsanghModal = require('../models/bagherwalsangh')
const uploadToCloudinary = require('../config/cloudinary'); 

exports.bagherwalsangh = async (req,res)  =>  {
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

    const bagherwalsanghData = new bagherwalsanghModal(req.body)
    await bagherwalsanghData.save()
    res.status(201).send(bagherwalsanghData)
}catch (error){
    res.status(400).json({error:error.message})
}
};

exports.updatebagherwalsanghByApplicant = async (req,res) => {
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

        const updatedbagherwalsanghData = await bagherwalsanghModal.findByIdAndUpdate(
             id,
            // req.params.id,
            req.body,
            {new:true}
        );
        if (!updatedbagherwalsanghData) {
            return res.status(404).json({ message: 'bagherwalsangh record not found for applicant' });
          }
        res.status(200).json(updatedbagherwalsanghData)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

exports.getbagherwalsanghbyApplicant = async (req,res) => {
    try{
        const {id} = req.params;
        const bagherwalsanghData = await bagherwalsanghModal.findById(id);

        if (!bagherwalsanghData) {
            return res.status(404).json({ message: 'No bagherwalsangh data found for this applicant' });
          }

        res.status(200).json(bagherwalsanghData);  
    }catch (error) {
        res.status(400).json({ error: error.message });
      }
}

exports.getbagherwalsanghs = async (req, res) => {
  try {
    const limit = 5;
    const page = parseInt(req.query.page) || 1;
    const search = req.query.search || "";

    const query = search ? {
        title:{ $regex: search, $options: 'i' }      
    }:{};

    const total = await bagherwalsanghModal.countDocuments(query);
    

    const bagherwalsanghs = await bagherwalsanghModal.find(query).select('title -_id').skip((page-1)*limit).limit(limit);

    
    res.status(201).json({data:bagherwalsanghs,page,totalPages: Math.ceil(total/limit) });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
  };

    exports.deleteItemById = async (req,res) => {
    try {
        const { id } = req.params;
    
        const member = await bagherwalsanghModal.findByIdAndDelete(id);
    
        if (!member) {
          return res.status(404).json({ message: "bagherwalsangh not found" });
        }
    
        res.status(200).json({ message:"bagherwalsangh deleted successfully" });
      } catch (error) {
        res.status(500).json({ err: error.message });
      }
  }