const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
    listVenues,
    createVenue
} = require('../controllers/facilityControllers');

const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error('Only JPEG, PNG, and WEBP formats are allowed'));
        }
        cb(null, true);
    }
});

router.get('/venues', listVenues);
router.post('/add-venue', upload.array('images', 5), createVenue);

module.exports = router;