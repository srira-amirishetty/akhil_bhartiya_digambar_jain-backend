const authorizedUserModel = require('../models/authorizedUser');

exports.create = async (req,res) => {
    try{
    req.body.img= {
        data:req.file.buffer,
        contentType:req.file.mimetype
    }

    const authorizedUserData = new authorizedUserModel(req.body)
    await authorizedUserData.save()
    res.status(201).json(authorizedUserData)
}catch(error){
    res.status(400).json({error:error.message})
}
}

exports.update = async (req,res) => {
    try{

        const {id} =req.params;

        if(req.file){
            req.body.img= {
                data:req.file.buffer,
                contentType:req.file.mimetype
            }
        }

        const updatedUserData = await authorizedUserModel.findByIdAndUpdate(
            {_id:id},
            req.body,
            {new:true}
        );
        
        if (!updatedUserData) {
            return res.status(404).json({ message: 'Authorized User record not found ' });
          }
        res.status(200).json(updatedUserData)

    }catch(error){
        res.status(400).json({error:error.message})
    }
}

exports.getMembers = async (req, res) => {
    try {
      const limit = 5;
      const page = parseInt(req.query.page) || 1;
      const search = req.query.search || "";
      const role = req.query.role;

      const query={}
  
      if(search){query.name = { $regex: search, $options: 'i' }};
      if(role){query.role=role};
      
      const total = await authorizedUserModel.countDocuments(query);
  
      const members = await authorizedUserModel.find(query).skip((page-1)*limit).limit(limit);
  
      res.status(200).json({data:members,totalPages: Math.ceil(total/limit) });
    } catch (error) {
      res.status(500).json({ err: error.message });
    }
  };

  exports.getItemById = async (req,res) => {
    try {
        const { id } = req.params;
    
        const member = await authorizedUserModel.findById(id);
    
        if (!member) {
          return res.status(404).json({ message: "Member not found" });
        }
    
        res.status(200).json({ data: member });
      } catch (error) {
        res.status(500).json({ err: error.message });
      }
  }

  
  exports.deleteItemById = async (req,res) => {
    try {
        const { id } = req.params;
    
        const member = await authorizedUserModel.findByIdAndDelete(id);
    
        if (!member) {
          return res.status(404).json({ message: "Member not found" });
        }
    
        res.status(200).json({ message:"Member deleted successfully" });
      } catch (error) {
        res.status(500).json({ err: error.message });
      }
  }



