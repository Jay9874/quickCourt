const ImageKit = require('imagekit');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const cache = require('../utils/cache')
const sendMail = require('../utils/mailer');

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
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        else if (!user.isVerified) {
            return res.status(403).json({ message: 'Please verify your email before logging in' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

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
        if (!email) return res.status(400).json({ message: 'Email is required' });
        if (password.length < 6) return res.status(400).json({ message: 'Minimum password length is 6' });
        if (role !== 'player' && role !== 'facility') {
            return res.status(400).json({ message: 'Role is required' });
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
            isVerified: false
        });

        await newUser.save();

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        cache.set(email, otp);

        const mailOptions = {
            from: `${process.env.EMAIL_USER} <${process.env.EMAIL_ADDRESS}>`,
            to: email,
            subject: 'Account Registration OTP',
            html: `<p>Here's your OTP for QuickCourt: ${otp}</p>`
        };

        await sendMail(mailOptions)
            .then(() => {
                res.status(201).send({ message: 'OTP sent successfully' })
            })
            .catch(err => {
                res.status(400).json({ error: 'Failed to send OTP' });
            });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    const cachedOtp = cache.get(email);

    if (cachedOtp !== otp) {
        return res.status(400).json({ message: 'Invalid OTP' });
    }

    const user = await User.findOneAndUpdate(
        { email },
        { isVerified: true },
        { new: true }
    );

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    cache.del(email);

    res.status(200).json({ message: 'Email verified successfully' });
};

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) return res.status(400).json({ message: 'Email is required' });

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const token = crypto.randomBytes(32).toString('hex');

        cache.set(`reset_${token}`, email);

        const resetLink = `${process.env.CLIENT_URL}/reset/${token}`;
        await sendMail({
            from: `${process.env.EMAIL_USER} <${process.env.EMAIL_ADDRESS}>`,
            to: email,
            subject: 'Password Reset - QuickCourt',
            html: `<p>Click <a href='${resetLink}'>here</a> to reset your password. This link will expire in 15 minutes.</p>`
        });

        res.status(200).json({ message: 'Password reset link sent to your email' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        if (!password || password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters' });
        }

        const email = cache.get(`reset_${token}`);
        if (!email) {
            return res.status(400).json({ message: 'Invalid or expired reset link' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.findOneAndUpdate({ email }, { password: hashedPassword });

        cache.del(`reset_${token}`);

        res.status(200).json({ message: 'Password reset successful' });
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