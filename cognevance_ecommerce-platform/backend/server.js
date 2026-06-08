require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const fs = require('fs');
const { register, login, getMe } = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const { protect } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 5003;

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

app.use(cors({ origin: process.env.CLIENT_URL || '*', credentials: true }));
app.use(express.json());
app.use('/uploads', express.static(uploadsDir));

app.get('/api/health', (_req, res) => {
  res.json({ success: true, message: 'E-Commerce API is running' });
});

app.post('/api/auth/register', register);
app.post('/api/auth/login', login);
app.get('/api/auth/me', protect, getMe);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/analytics', analyticsRoutes);

mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/cognevance_ecommerce')
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });
