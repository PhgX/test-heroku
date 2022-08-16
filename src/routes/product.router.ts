import express from 'express';
import { auth } from 'src/middleware/auth';
import productController from '../controller/product-controller';

export const productRoutes = express.Router();

productRoutes.use(auth);
// productRoutes.get('', productController.showHomepage);
