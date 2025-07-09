import { Router } from 'express';
import {
  addToCart,
  removeFromCart,
  getCart
} from '../controllers/cartController.js';
import { protect } from '../middleware/auth.js';
import { allow } from '../middleware/role.js';

export default Router()
  .use(protect, allow('customer')) // customer routes
  .get('/', getCart)
  .post('/add', addToCart)
  .post('/remove', removeFromCart);
