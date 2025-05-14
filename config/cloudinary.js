const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const {Readable} = require('stream');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


// Helper: Convert buffer to readable stream
const bufferToStream = (buffer) => {
  const readable = new Readable();
  readable._read = () => {}; // _read is required but you can noop it
  readable.push(buffer);
  readable.push(null);
  return readable;
};

 const uploadToCloudinary = (fileBuffer) => 
      new Promise((resolve,reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {resource_type:"image"},
          (error,result) => {
            if(error) reject(error);
            else resolve(result.secure_url);
          }
        );
        bufferToStream(fileBuffer).pipe(stream);
      });

module.exports = uploadToCloudinary

