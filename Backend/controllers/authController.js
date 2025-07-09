import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await User.create({ name, email, password, role });
    const token = signToken(user._id);
    res.status(201).json({ token });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password)))
      return res.status(400).json({ msg: 'Invalid credentials' });
    const token = signToken(user._id);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
