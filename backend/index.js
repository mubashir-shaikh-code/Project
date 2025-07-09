const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// ✅ Increase payload limit to handle large base64 image data
app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

// ✅ Serve static files if needed
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
  
//MOONGODB CONNECTION
mongoose.connect('mongodb+srv://MuhammadMubashir:Matz@project.lbrheme.mongodb.net/test')
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => console.error('❌ MongoDB connection failed:', err));

// ✅ Import and use routes
const authRoutes = require('./Routes/Route');
app.use('/api', authRoutes);

app.get('/', (req, res) => {
  res.send('Hello from Vercel Serverless Function!');
});

// ✅ Start server
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
