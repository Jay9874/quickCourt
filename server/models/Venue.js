const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    sports: {
        type: [String],
        default: []
    },
    amenities: {
        type: [String],
        default: []
    },
    openingHours: [{
        weekday: { type: String },
        time: { type: Date }
    }],
    images: {
        type: [String],
        required: true
    },
    courts: [{
        name: { type: String },
        description: { type: String },
        sport: { type: String },
        price: { type: Number },
        available: { type: Boolean },
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Venue', venueSchema);