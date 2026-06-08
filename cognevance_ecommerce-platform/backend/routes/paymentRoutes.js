const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/create-intent', protect, async (req, res) => {
  try {
    const { orderId } = req.body;
    const order = await Order.findById(orderId);
    if (!order || order.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(order.totalAmount * 100),
      currency: 'usd',
      metadata: { orderId: order._id.toString() },
    });

    res.json({ success: true, data: { clientSecret: paymentIntent.client_secret } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/confirm', protect, async (req, res) => {
  try {
    const { orderId, paymentId } = req.body;
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

    order.status = 'paid';
    order.paymentId = paymentId;
    await order.save();

    for (const item of order.items) {
      await require('../models/Product').findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity },
      });
    }

    await Cart.findOneAndUpdate({ user: req.user._id }, { items: [] });

    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
