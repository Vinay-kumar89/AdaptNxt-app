import Order from '../models/Order.js';
import User from '../models/User.js';
import Product from '../models/Product.js';

export const createOrder = async (req, res) => {
  const user = await User.findById(req.user._id).populate('cart.product');
  if (!user.cart.length) return res.status(400).json({ msg: 'Cart empty' });

  const items = user.cart.map((c) => ({
    product: c.product._id,
    qty: c.qty,
    price: c.product.price
  }));
  const total = items.reduce((sum, i) => sum + i.qty * i.price, 0);
  const order = await Order.create({ customer: user._id, items, total });

  // Empty cart
  user.cart = [];
  await user.save();

  res.status(201).json(order);
};

export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ customer: req.user._id }).populate(
    'items.product'
  );
  res.json(orders);
};
