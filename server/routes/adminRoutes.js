const express = require('express');
const router = express.Router();
const {
    getDashboard,
    getAllNonAdminUsers
} = require('../controllers/adminControllers');

router.get('/dashboard', getDashboard);
router.get('/users', getAllNonAdminUsers);

module.exports = router;