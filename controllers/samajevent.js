const samajeventModal = require('../models/samajevent')
const uploadToCloudinary = require('../config/cloudinary'); 

exports.samajevent = async (req,res)  =>  {
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

    const samajeventData = new samajeventModal(req.body)
    await samajeventData.save()
    res.status(201).send(samajeventData)
}catch (error){
    res.status(400).json({error:error.message})
}
};

exports.updatesamajeventByApplicant = async (req,res) => {
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

        const updatedsamajeventData = await samajeventModal.findByIdAndUpdate(
             id,
            // req.params.id,
            req.body,
            {new:true}
        );
        if (!updatedsamajeventData) {
            return res.status(404).json({ message: 'samajevent record not found for applicant' });
          }
        res.status(200).json(updatedsamajeventData)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

exports.getsamajeventbyApplicant = async (req,res) => {
    try{
        const {id} = req.params;
        const samajeventData = await samajeventModal.findById(id);

        if (!samajeventData) {
            return res.status(404).json({ message: 'No samajevent data found for this applicant' });
          }

        res.status(200).json(samajeventData);  
    }catch (error) {
        res.status(400).json({ error: error.message });
      }
}

exports.getsamajevents = async (req, res) => {
  try {
    const limit = 5;
    const page = parseInt(req.query.page) || 1;
    const search = req.query.search || "";

    const query = search ? {
        title:{ $regex: search, $options: 'i' }      
    }:{};

    const total = await samajeventModal.countDocuments(query);
    

    const samajevents = await samajeventModal.find(query).skip((page-1)*limit).limit(limit);

    
    res.status(201).json({data:samajevents,page,totalPages: Math.ceil(total/limit) });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
  };

    exports.deleteItemById = async (req,res) => {
    try {
        const { id } = req.params;
    
        const member = await samajeventModal.findByIdAndDelete(id);
    
        if (!member) {
          return res.status(404).json({ message: "samajevent not found" });
        }
    
        res.status(200).json({ message:"samajevent deleted successfully" });
      } catch (error) {
        res.status(500).json({ err: error.message });
      }
  }