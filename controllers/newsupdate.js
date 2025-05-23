const newsupadteModal = require('../models/newsupadte')
const uploadToCloudinary = require('../config/cloudinary'); 

exports.newsupadte = async (req,res)  =>  {
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

    const newsupadteData = new newsupadteModal(req.body)
    await newsupadteData.save()
    res.status(201).send(newsupadteData)
}catch (error){
    res.status(400).json({error:error.message})
}
};

exports.updatenewsupadteByApplicant = async (req,res) => {
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

        const updatednewsupadteData = await newsupadteModal.findByIdAndUpdate(
             id,
            // req.params.id,
            req.body,
            {new:true}
        );
        if (!updatednewsupadteData) {
            return res.status(404).json({ message: 'newsupadte record not found for applicant' });
          }
        res.status(200).json(updatednewsupadteData)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

exports.getnewsupadtebyApplicant = async (req,res) => {
    try{
        const {id} = req.params;
        const newsupadteData = await newsupadteModal.findById(id);

        if (!newsupadteData) {
            return res.status(404).json({ message: 'No newsupadte data found for this applicant' });
          }

        res.status(200).json(newsupadteData);  
    }catch (error) {
        res.status(400).json({ error: error.message });
      }
}

exports.getnewsupadtes = async (req, res) => {
  try {
    const limit = 5;
    const page = parseInt(req.query.page) || 1;
    const search = req.query.search || "";

    const query = search ? {
        title:{ $regex: search, $options: 'i' }      
    }:{};

    const total = await newsupadteModal.countDocuments(query);
    

    const newsupadtes = await newsupadteModal.find(query).select('title -_id').skip((page-1)*limit).limit(limit);

    
    res.status(201).json({data:newsupadtes,page,totalPages: Math.ceil(total/limit) });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
  };

    exports.deleteItemById = async (req,res) => {
    try {
        const { id } = req.params;
    
        const member = await newsupadteModal.findByIdAndDelete(id);
    
        if (!member) {
          return res.status(404).json({ message: "newsupadte not found" });
        }
    
        res.status(200).json({ message:"newsupadte deleted successfully" });
      } catch (error) {
        res.status(500).json({ err: error.message });
      }
  }