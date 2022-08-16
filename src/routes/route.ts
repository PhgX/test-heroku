import { Router } from "express";
import { loginRoutes } from "./login.router";
import { productRoutes } from "./product.router";

export const router = Router();
router.use('/auth', loginRoutes);
router.use('/product', productRoutes);