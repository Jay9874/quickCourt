const express = require('express');
const router = express.Router();
const multer = require('multer');
const verifyUser = require('../middlewares/verifyUser');
const {
    getMe,
    login,
    signup,
    verifyOtp,
    logout,
    forgotPassword,
    resetPassword
} = require('../controllers/authControllers');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/me', verifyUser, getMe);
router.post('/login', login);
router.post('/signup', upload.single('avatar'), signup);
router.post('/verify', verifyOtp);
router.post('/forgot', forgotPassword);
router.post('/reset/:token', resetPassword);
router.get('/logout', logout);

module.exports = router;