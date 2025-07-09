import User from '../models/User.js';
import Product from '../models/Product.js';

// Add or update item
export const addToCart = async (req, res) => {
  const { productId, qty = 1 } = req.body;
  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ msg: 'Product not found' });

  const user = await User.findById(req.user._id);
  const item = user.cart.find((i) => i.product.equals(productId));
  if (item) item.qty = qty;
  else user.cart.push({ product: productId, qty });
  await user.save();
  res.json(user.cart);
};

export const removeFromCart = async (req, res) => {
  const { productId } = req.body;
  const user = await User.findById(req.user._id);
  user.cart = user.cart.filter((i) => !i.product.equals(productId));
  await user.save();
  res.json(user.cart);
};

export const getCart = async (req, res) => {
  const user = await User.findById(req.user._id).populate('cart.product');
  res.json(user.cart);
};
