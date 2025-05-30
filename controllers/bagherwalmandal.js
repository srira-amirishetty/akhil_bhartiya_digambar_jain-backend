const bagherwalmandalModal = require('../models/bagherwalmandal')
const uploadToCloudinary = require('../config/cloudinary'); 

exports.bagherwalmandal = async (req,res)  =>  {
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

    const bagherwalmandalData = new bagherwalmandalModal(req.body)
    await bagherwalmandalData.save()
    res.status(201).send(bagherwalmandalData)
}catch (error){
    res.status(400).json({error:error.message})
}
};

exports.updatebagherwalmandalByApplicant = async (req,res) => {
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

        const updatedbagherwalmandalData = await bagherwalmandalModal.findByIdAndUpdate(
             id,
            // req.params.id,
            req.body,
            {new:true}
        );
        if (!updatedbagherwalmandalData) {
            return res.status(404).json({ message: 'bagherwalmandal record not found for applicant' });
          }
        res.status(200).json(updatedbagherwalmandalData)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

exports.getbagherwalmandalbyApplicant = async (req,res) => {
    try{
        const {id} = req.params;
        const bagherwalmandalData = await bagherwalmandalModal.findById(id);

        if (!bagherwalmandalData) {
            return res.status(404).json({ message: 'No bagherwalmandal data found for this applicant' });
          }

        res.status(200).json(bagherwalmandalData);  
    }catch (error) {
        res.status(400).json({ error: error.message });
      }
}

exports.getbagherwalmandals = async (req, res) => {
  try {
    const limit = 5;
    const page = parseInt(req.query.page) || 1;
    const search = req.query.search || "";

    const query = search ? {
        title:{ $regex: search, $options: 'i' }      
    }:{};

    const total = await bagherwalmandalModal.countDocuments(query);
    

    const bagherwalmandals = await bagherwalmandalModal.find(query).select('title -_id').skip((page-1)*limit).limit(limit);

    
    res.status(201).json({data:bagherwalmandals,page,totalPages: Math.ceil(total/limit) });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
  };

    exports.deleteItemById = async (req,res) => {
    try {
        const { id } = req.params;
    
        const member = await bagherwalmandalModal.findByIdAndDelete(id);
    
        if (!member) {
          return res.status(404).json({ message: "bagherwalmandal not found" });
        }
    
        res.status(200).json({ message:"bagherwalmandal deleted successfully" });
      } catch (error) {
        res.status(500).json({ err: error.message });
      }
  }

  exports.submitData = (req, res) => {
    res.send("Data received");
  };
  