const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Connect DB
connectDB();

// Routes
app.use('/api/form', require('./routes/shayataAppform'));

app.get('/', (req, res) => {
  res.send('Welcome to the Shayata API');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
