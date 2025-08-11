const express = require('express');
const router = express.Router();
const multer = require('multer');
const verifyUser = require('../middlewares/verifyUser');
const {
    getMe,
    login,
    signup,
    logout
} = require('../controllers/authControllers');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/me', verifyUser, getMe);
router.post('/login', login);
router.post('/signup', upload.single('avatar'), signup);
router.get('/logout', logout);

module.exports = router;