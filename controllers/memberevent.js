const membereventModal = require('../models/memberevent')
const uploadToCloudinary = require('../config/cloudinary'); 

exports.memberevent = async (req,res)  =>  {
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

    const membereventData = new membereventModal(req.body)
    await membereventData.save()
    res.status(201).send(membereventData)
}catch (error){
    res.status(400).json({error:error.message})
}
};

exports.updatemembereventByApplicant = async (req,res) => {
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

        const updatedmembereventData = await membereventModal.findByIdAndUpdate(
             id,
            // req.params.id,
            req.body,
            {new:true}
        );
        if (!updatedmembereventData) {
            return res.status(404).json({ message: 'memberevent record not found for applicant' });
          }
        res.status(200).json(updatedmembereventData)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

exports.getmembereventbyApplicant = async (req,res) => {
    try{
        const {id} = req.params;
        const membereventData = await membereventModal.findById(id);

        if (!membereventData) {
            return res.status(404).json({ message: 'No memberevent data found for this applicant' });
          }

        res.status(200).json(membereventData);  
    }catch (error) {
        res.status(400).json({ error: error.message });
      }
}

exports.getmemberevents = async (req, res) => {
  try {
    const limit = 5;
    const page = parseInt(req.query.page) || 1;
    const search = req.query.search || "";

    const query = search ? {
        title:{ $regex: search, $options: 'i' }      
    }:{};

    const total = await membereventModal.countDocuments(query);
    

    const memberevents = await membereventModal.find(query).select('title -_id').skip((page-1)*limit).limit(limit);

    
    res.status(201).json({data:memberevents,page,totalPages: Math.ceil(total/limit) });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
  };

    exports.deleteItemById = async (req,res) => {
    try {
        const { id } = req.params;
    
        const member = await membereventModal.findByIdAndDelete(id);
    
        if (!member) {
          return res.status(404).json({ message: "memberevent not found" });
        }
    
        res.status(200).json({ message:"memberevent deleted successfully" });
      } catch (error) {
        res.status(500).json({ err: error.message });
      }
  }