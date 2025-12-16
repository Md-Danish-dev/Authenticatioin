const express=require('express');
const { register, login, logout, verifyEmail, forgotPassword, resetPassword, checkAuth } = require('../controllers/authController');
const { verifyToken } = require('../middleware/verifyToken');
const router=express.Router();

// routes here
router.post('/check-auth', verifyToken, checkAuth);
router.post('/signup',register);
router.post('/login',login);
router.post('/verifyEmail',verifyEmail)
router.post('/forgot-password',forgotPassword);
router.post('/reset-password/:token',resetPassword);
router.post('/logout',logout);
module.exports=router;
