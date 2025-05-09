const educationModal = require('../models/Shayataeducation')

exports.health = async (req,res)  =>  {
    try{
    const data = req.body;

    // req.body.img = {
    //     data:req.file.buffer,
    //     contentType:req.file.mimetype
    // } 

    if (req.files && req.files.length > 0) {
        req.body.images = req.files.map(file => ({
          data: file.buffer,
          contentType: file.mimetype
        }));
      }

    const educationData = new educationModal(req.body)
    await educationData.save()
    res.status(201).send(educationData)
}catch (error){
    res.status(400).json({error:error.message})
}
};

exports.updateeducationByApplicant = async (req,res) => {
    try{

        const {applicantId} = req.params;

        const updateData = {...req.body};

        if (req.files && req.files.length > 0) {
            updateData.images = req.files.map(file => ({
              data: file.buffer,
              contentType: file.mimetype
            }));
          }

        const updatededucationData = await educationModal.findByIdAndUpdate(
            {applicant:applicantId},
            updateData,
            {new:true}
        );
        if (!updatededucationData) {
            return res.status(404).json({ message: 'Health record not found for applicant' });
          }
        res.status(200).json(updatededucationData)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

exports.geteducationbyApplicant = async (req,res) => {
    try{
        const {applicantId} = req.params;
        const educationData = await educationModal.findOne({applicant:applicantId});

        if (!educationData) {
            return res.status(404).json({ message: 'No education data found for this applicant' });
          }

        res.status(200).json(educationData);  
    }catch (error) {
        res.status(400).json({ error: error.message });
      }
}

