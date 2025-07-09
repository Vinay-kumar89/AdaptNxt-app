import Product from '../models/Product.js';

// GET /api/products?search=shirt&page=1&limit=10
export const getProducts = async (req, res) => {
  const { search = '', page = 1, limit = 10 } = req.query;
  const query = {
    $or: [
      { name: { $regex: search, $options: 'i' } },
      { category: { $regex: search, $options: 'i' } }
    ]
  };
  const products = await Product.find(query)
    .skip((page - 1) * limit)
    .limit(Number(limit));
  const count = await Product.countDocuments(query);
  res.json({ products, count });
};

export const getProduct = async (req, res) => {
  const prod = await Product.findById(req.params.id);
  if (!prod) return res.status(404).json({ msg: 'Product not found' });
  res.json(prod);
};

// Admin only
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};
export const updateProduct = async (req, res) => {
  const prod = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });
  if (!prod) return res.status(404).json({ msg: 'Product not found' });
  res.json(prod);
};
export const deleteProduct = async (req, res) => {
  const prod = await Product.findByIdAndDelete(req.params.id);
  if (!prod) return res.status(404).json({ msg: 'Product not found' });
  res.json({ msg: 'Deleted' });
};
