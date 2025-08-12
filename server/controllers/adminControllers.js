const User = require('../models/User');
const Venue = require('../models/Venue');

exports.getDashboard = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalFacility = await User.find({ role: 'facility' }).countDocuments();

        const activeCourtsAgg = await Venue.aggregate([
            { $unwind: '$courts' },
            { $match: { 'courts.available': true } },
            { $count: 'totalActiveCourts' }
        ]);

        const totalActiveCourts =
            activeCourtsAgg.length > 0 ? activeCourtsAgg[0].totalActiveCourts : 0;

        return res.status(200).json({
            totalUsers,
            totalFacility,
            totalActiveCourts
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

exports.getAllNonAdminUsers = async (req, res) => {
    try {
        const users = await User.find({ role: { $ne: 'admin' } }).select('-password');

        return res.status(200).json({ users });
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};