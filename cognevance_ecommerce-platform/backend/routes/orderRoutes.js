const express = require('express');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

router.post('/create', protect, async (req, res) => {
  try {
    const { shippingAddress } = req.body;
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    if (!cart?.items.length) {
      return res.status(400).json({ success: false, message: 'Cart is empty' });
    }

    const items = cart.items.map((item) => ({
      product: item.product._id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      image: item.product.image,
    }));

    const totalAmount = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    const order = await Order.create({
      user: req.user._id,
      items,
      totalAmount,
      shippingAddress,
    });

    res.status(201).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/my', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/', protect, admin, async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/:id/status', protect, admin, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
