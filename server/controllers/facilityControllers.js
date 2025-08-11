const ImageKit = require('imagekit');
const Venue = require('../models/Venue');

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

exports.createVenue = async (req, res) => {
    try {
        const { name, location, description, sports, amenities } = req.body;

        if (!name || !location || !description) {
            return res.status(400).json({ message: 'Name, location, and description are required' });
        }

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'At least one image is required' });
        }

        const uploadedImages = [];
        for (const file of req.files) {
            const uploadResult = await imagekit.upload({
                file: file.buffer,
                fileName: file.originalname,
                folder: 'venues',
            });
            uploadedImages.push(uploadResult.url);
        }

        const sportsArray = Array.isArray(sports) ? sports : (sports ? [sports] : []);
        const amenitiesArray = Array.isArray(amenities) ? amenities : (amenities ? [amenities] : []);

        const newVenue = new Venue({
            name,
            location,
            description,
            sports: sportsArray,
            amenities: amenitiesArray,
            images: uploadedImages,
            createdBy: req.user._id
        });

        await newVenue.save();

        res.status(201).json({ message: 'Venue created successfully' });
    } 
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};