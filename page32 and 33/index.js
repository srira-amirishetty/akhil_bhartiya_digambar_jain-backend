const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const memberUpdateRoutes = require('./routes/memberUpdateRoutes');
const memberListRoutes = require('./routes/memberListRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.use('/api/form', require('./routes/shayataAppform'));
app.use('/api/member-update', memberUpdateRoutes);
app.use('/api/member-list', memberListRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Shayata API');
  });
  
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));