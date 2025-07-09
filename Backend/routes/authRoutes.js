import { Router } from 'express';
import { login, register } from '../controllers/authController.js';
export default Router()
  .post('/register', register)
  .post('/login', login);
