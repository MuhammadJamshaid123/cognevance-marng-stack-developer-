const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { protect } = require('../middleware/auth');

const router = express.Router();
router.use(protect);

const getOrCreateCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId }).populate('items.product');
  if (!cart) cart = await Cart.create({ user: userId, items: [] });
  return cart;
};

router.get('/', async (req, res) => {
  try {
    const cart = await getOrCreateCart(req.user._id);
    res.json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/add', async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    const cart = await getOrCreateCart(req.user._id);
    const existing = cart.items.find((i) => i.product._id.toString() === productId);

    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    await cart.populate('items.product');
    res.json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/update/:productId', async (req, res) => {
  try {
    const { quantity } = req.body;
    const cart = await getOrCreateCart(req.user._id);
    const item = cart.items.find((i) => i.product._id.toString() === req.params.productId);

    if (!item) return res.status(404).json({ success: false, message: 'Item not in cart' });
    if (quantity <= 0) {
      cart.items = cart.items.filter((i) => i.product._id.toString() !== req.params.productId);
    } else {
      item.quantity = quantity;
    }

    await cart.save();
    await cart.populate('items.product');
    res.json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete('/remove/:productId', async (req, res) => {
  try {
    const cart = await getOrCreateCart(req.user._id);
    cart.items = cart.items.filter((i) => i.product._id.toString() !== req.params.productId);
    await cart.save();
    await cart.populate('items.product');
    res.json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete('/clear', async (req, res) => {
  try {
    const cart = await getOrCreateCart(req.user._id);
    cart.items = [];
    await cart.save();
    res.json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
