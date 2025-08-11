const ImageKit = require('imagekit');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

exports.getMe = (req, res) => {
    res.status(200).json({ user: req.user });
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax',
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(200).json({ message: 'Login successful' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        let avatarUrl = '';

        if (!name) return res.status(400).json({ message: 'Name is required' });
        else if (!email) return res.status(400).json({ message: 'Email is required' });
        else if (password.length < 6) return res.status(400).json({ message: 'Minimum password length is 6' });
        else if (role !== 'player' && role !== 'facility') {
            return res.status(400).json({ message: 'Role is required' })
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        if (req.file) {
            const fileBuffer = req.file.buffer;
            const fileName = req.file.originalname;

            const uploadResult = await imagekit.upload({
                file: fileBuffer,
                fileName,
                folder: 'avatars',
            });

            avatarUrl = uploadResult.url;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
            avatar: avatarUrl,
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.logout = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax',
    });

    res.status(200).json({ message: 'Logged out successfully' });
};