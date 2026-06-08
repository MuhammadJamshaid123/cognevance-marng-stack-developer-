const express = require('express');
const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();
router.use(protect, admin);

router.get('/dashboard', async (_req, res) => {
  try {
    const [totalOrders, totalProducts, totalUsers, orders] = await Promise.all([
      Order.countDocuments(),
      Product.countDocuments(),
      User.countDocuments({ role: 'customer' }),
      Order.find({ status: { $in: ['paid', 'shipped', 'delivered'] } }),
    ]);

    const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
    const recentOrders = await Order.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .limit(10);

    const salesByMonth = await Order.aggregate([
      { $match: { status: { $in: ['paid', 'shipped', 'delivered'] } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
          revenue: { $sum: '$totalAmount' },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const topProducts = await Order.aggregate([
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.name',
          totalSold: { $sum: '$items.quantity' },
          revenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } },
        },
      },
      { $sort: { totalSold: -1 } },
      { $limit: 5 },
    ]);

    res.json({
      success: true,
      data: {
        totalOrders,
        totalProducts,
        totalUsers,
        totalRevenue,
        recentOrders,
        salesByMonth,
        topProducts,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
