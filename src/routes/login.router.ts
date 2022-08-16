import express from 'express';
import multer from 'multer';
import authController from '../controller/auth-controller';

const upload = multer();
export const loginRoutes = express.Router();

loginRoutes.get('/login', authController.showLoginForm);
loginRoutes.post('/login', upload.none(), authController.login);
loginRoutes.get('/signUp', authController.showSignUp);
loginRoutes.post('/signUp', upload.none(), authController.signUp);
