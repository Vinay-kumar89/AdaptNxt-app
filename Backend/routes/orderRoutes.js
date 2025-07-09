import { Router } from 'express';
import { createOrder, getMyOrders } from '../controllers/orderController.js';
import { protect } from '../middleware/auth.js';
import { allow } from '../middleware/role.js';

export default Router()
  .use(protect, allow('customer'))
  .post('/', createOrder)
  .get('/', getMyOrders);
