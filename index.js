const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

let MONGO_URI = (process.env.MONGO_IP) ? `mongodb://${process.env.MONGO_IP}` : `mongodb://localhost`;
MONGO_URI += ':27017/testdb';

mongoose
  .connect(MONGO_URI, {})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));


app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.get('/', (req, res) => {
  res.render('welcome', {
    version: process.versions.node,
    os: process.platform
  });
});

// MongoDB Connection Test API
app.get('/test-mongo', async (req, res) => {
  try {
    await mongoose.connection.db.admin().ping();
    res.json({ success: true, message: 'MongoDB is connected' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'MongoDB is not connected', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});