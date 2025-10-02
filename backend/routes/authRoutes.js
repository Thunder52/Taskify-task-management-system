import express from 'express';
const router=express.Router();
import {registerController,loginController} from '../controller/authController.js'


router.post('/register',registerController);
router.post('/login',loginController);

export default router;