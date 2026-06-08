require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { register, login, getMe } = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const { protect } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors({ origin: process.env.CLIENT_URL || '*', credentials: true }));
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ success: true, message: 'Task Management API is running' });
});

app.post('/api/auth/register', register);
app.post('/api/auth/login', login);
app.get('/api/auth/me', protect, getMe);
app.use('/api/tasks', taskRoutes);

mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/cognevance_tasks')
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });
