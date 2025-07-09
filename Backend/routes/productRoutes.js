import { Router } from 'express';
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js';
import { protect } from '../middleware/auth.js';
import { allow } from '../middleware/role.js';

export default Router()
  .get('/', getProducts)
  .get('/:id', getProduct)
  .post('/', protect, allow('admin'), createProduct)
  .put('/:id', protect, allow('admin'), updateProduct)
  .delete('/:id', protect, allow('admin'), deleteProduct);
