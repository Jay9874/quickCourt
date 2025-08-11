exports.getDashboard = async (req, res) => {
    try {
        return res.status(200).json({});
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}