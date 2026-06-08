require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const contactRoutes = require('./routes/contactRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({ origin: process.env.CLIENT_URL || '*', credentials: true }));
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ success: true, message: 'Portfolio API is running' });
});

app.use('/api/contact', contactRoutes);

mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/cognevance_portfolio')
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });
