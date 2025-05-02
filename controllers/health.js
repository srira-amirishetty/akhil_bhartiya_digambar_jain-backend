const healthModal = require('../models/health')

exports.health = async (req,res)  =>  {
    const data = req.body;

    req.body.img = {
        data:req.file.buffer,
        contentType:req.file.mimetype
    } 

    const healthData = new healthModal(req.body)
    await healthData.save()
    res.send(data)
} 

