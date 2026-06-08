require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Product = require('../models/Product');

const products = [
  { name: 'Wireless Headphones', description: 'Premium noise-cancelling wireless headphones', price: 149.99, category: 'Electronics', stock: 50, featured: true, image: '' },
  { name: 'Smart Watch', description: 'Fitness tracking smartwatch with heart rate monitor', price: 299.99, category: 'Electronics', stock: 30, featured: true, image: '' },
  { name: 'Running Shoes', description: 'Lightweight running shoes for all terrains', price: 89.99, category: 'Fashion', stock: 100, featured: false, image: '' },
  { name: 'Leather Backpack', description: 'Stylish leather backpack for daily use', price: 79.99, category: 'Fashion', stock: 45, featured: true, image: '' },
  { name: 'Coffee Maker', description: 'Automatic drip coffee maker with timer', price: 59.99, category: 'Home', stock: 25, featured: false, image: '' },
  { name: 'Yoga Mat', description: 'Non-slip eco-friendly yoga mat', price: 34.99, category: 'Sports', stock: 80, featured: false, image: '' },
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/cognevance_ecommerce');

  const adminExists = await User.findOne({ email: 'admin@cognevance.com' });
  if (!adminExists) {
    await User.create({ name: 'Admin', email: 'admin@cognevance.com', password: 'admin123', role: 'admin' });
    console.log('Admin user created: admin@cognevance.com / admin123');
  }

  const count = await Product.countDocuments();
  if (count === 0) {
    await Product.insertMany(products);
    console.log(`${products.length} products seeded`);
  }

  console.log('Seed completed');
  process.exit(0);
}

seed().catch((err) => { console.error(err); process.exit(1); });
