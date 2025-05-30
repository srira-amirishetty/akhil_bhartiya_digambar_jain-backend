const jainLiteratureModal = require('../models/jainLiterature')
const uploadToCloudinary = require('../config/cloudinary'); 

exports.create = async (req,res)  =>  {
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

    const Data = new jainLiteratureModal(req.body)
    await Data.save()
    res.status(201).send(Data)
}catch (error){
    res.status(400).json({error:error.message})
}
};

exports.updateItemById = async (req,res) => {
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

        const updatedData = await jainLiteratureModal.findByIdAndUpdate(
             id,
            // req.params.id,
            req.body,
            {new:true}
        );
        if (!updatedData) {
            return res.status(404).json({ message: 'record not found for applicant' });
          }
        res.status(200).json(updatedData)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

exports.getItembyId = async (req,res) => {
    try{
        const {id} = req.params;
        const Data = await jainLiteratureModal.findById(id);

        if (!Data) {
            return res.status(404).json({ message: 'No data found for this applicant' });
          }

        res.status(200).json(Data);  
    }catch (error) {
        res.status(400).json({ error: error.message });
      }
}

exports.getItems = async (req, res) => {
  try {
    const limit = 5;
    const page = parseInt(req.query.page) || 1;
    const search = req.query.search || "";
    const type = req.query.type || "";

     const query = {};
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }
    if (type) {
      query.type = type;
    }

    const total = await jainLiteratureModal.countDocuments(query);
    

    const data = await jainLiteratureModal.find(query).select('title -_id').skip((page-1)*limit).limit(limit);

    
    res.status(200).json({data:data,page,totalPages: Math.ceil(total/limit) });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
  };

    exports.deleteItemById = async (req,res) => {
    try {
        const { id } = req.params;
    
        const member = await jainLiteratureModal.findByIdAndDelete(id);
    
        if (!member) {
          return res.status(404).json({ message: "Item not found" });
        }
    
        res.status(200).json({ message:"Item deleted successfully" });
      } catch (error) {
        res.status(500).json({ err: error.message });
      }
  }