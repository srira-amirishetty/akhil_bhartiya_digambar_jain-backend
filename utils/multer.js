const multer = require('multer');
const {Readable} = require('stream');

const storage = multer.memoryStorage();
const upload = multer({storage:storage});

// Helper: Convert buffer to readable stream
const bufferToStream = (buffer) => {
  const readable = new Readable();
  readable._read = () => {}; // _read is required but you can noop it
  readable.push(buffer);
  readable.push(null);
  return readable;
};

module.exports = bufferToStream
