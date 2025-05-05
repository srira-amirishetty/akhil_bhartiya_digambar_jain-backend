const financeModal = require('../models/finance')

exports.finance = async (req,res)  =>  {
    try{
    const data = req.body;

    req.body.img = {
        data:req.file.buffer,
        contentType:req.file.mimetype
    } 

    if (req.files && req.files.length > 0) {
        req.body.images = req.files.map(file => ({
          data: file.buffer,
          contentType: file.mimetype
        }));
      }

    const financeData = new financeModal(req.body)
    await financeData.save()
    res.status(201).send(financeData)
}catch (error){
    res.status(400).json({error:error.message})
}
};

exports.updatefinanceByApplicant = async (req,res) => {
    try{

        const {applicantId} = req.params;

        const updateData = {...req.body};

        if (req.files && req.files.length > 0) {
            updateData.images = req.files.map(file => ({
              data: file.buffer,
              contentType: file.mimetype
            }));
          }

        const updatedfinanceData = await financeModal.findByIdAndUpdate(
            {applicant:applicantId},
            updateData,
            {new:true}
        );
        if (!updatedfinanceData) {
            return res.status(404).json({ message: 'Health record not found for applicant' });
          }
        res.status(200).json(updatedfinanceData)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

exports.getfinancebyApplicant = async (req,res) => {
    try{
        const {applicantId} = req.params;
        const financeData = await financeModal.findOne({applicant:applicantId});

        if (!financeData) {
            return res.status(404).json({ message: 'No finance data found for this applicant' });
          }

        res.status(200).json(financeData);  
    }catch (error) {
        res.status(400).json({ error: error.message });
      }
}

