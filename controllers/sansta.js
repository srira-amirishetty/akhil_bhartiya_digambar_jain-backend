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

        const updatedsanstaData = await sanstaModal.findByIdAndUpdate(
             id,
            // req.params.id,
            req.body,
            {new:true}
        );
        if (!updatedsanstaData) {
            return res.status(404).json({ message: 'sansta record not found for applicant' });
          }
        res.status(200).json(updatedsanstaData)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

exports.getsanstabyApplicant = async (req,res) => {
    try{
        const {id} = req.params;
        const sanstaData = await sanstaModal.findById(id);

        if (!sanstaData) {
            return res.status(404).json({ message: 'No sansta data found for this applicant' });
          }

        res.status(200).json(sanstaData);  
    }catch (error) {
        res.status(400).json({ error: error.message });
      }
}

exports.getsanstas = async (req, res) => {
  try {
    const limit = 5;
    const page = parseInt(req.query.page) || 1;
    const search = req.query.search || "";

    const query = search ? {
        title:{ $regex: search, $options: 'i' }      
    }:{};

    const total = await sanstaModal.countDocuments(query);
    

    const sanstas = await sanstaModal.find(query).select('title -_id').skip((page-1)*limit).limit(limit);

    
    res.status(201).json({data:sanstas,page,totalPages: Math.ceil(total/limit) });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
  };

    exports.deleteItemById = async (req,res) => {
    try {
        const { id } = req.params;
    
        const member = await sanstaModal.findByIdAndDelete(id);
    
        if (!member) {
          return res.status(404).json({ message: "sansta not found" });
        }
    
        res.status(200).json({ message:"sansta deleted successfully" });
      } catch (error) {
        res.status(500).json({ err: error.message });
      }
  }