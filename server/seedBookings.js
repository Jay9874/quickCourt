const mongoose = require('mongoose');
const Booking = require('./models/Booking');
const User = require('./models/User');
require('dotenv').config();

async function seedBookings() {
  await mongoose.connect(process.env.MONGODB_URI);

  // Find a user to assign bookings to (replace with your test user's email)
  const user = await User.findOne();
  if (!user) throw new Error('No user found in DB');

  const bookings = [
    {
      user: user._id,
      venueName: 'Skyline Badminton Court',
      sport: 'Badminton',
      date: '18 June 2025',
      startTime: '5:00 PM',
      endTime: '6:00 PM',
      location: 'Rajkot, Gujarat',
      status: 'Confirmed',
    },
    {
      user: user._id,
      venueName: 'Skyline Badminton Court',
      sport: 'Badminton',
      date: '10 June 2024',
      startTime: '5:00 PM',
      endTime: '6:00 PM',
      location: 'Rajkot, Gujarat',
      status: 'Confirmed',
    },
    {
      user: user._id,
      venueName: 'Skyline Badminton Court',
      sport: 'Badminton',
      date: '1 May 2024',
      startTime: '5:00 PM',
      endTime: '6:00 PM',
      location: 'Rajkot, Gujarat',
      status: 'Cancelled',
    },
  ];

  await Booking.deleteMany({ user: user._id });
  await Booking.insertMany(bookings);
  console.log('Seeded bookings for user:', user.email);
  process.exit();
}

seedBookings().catch(e => { console.error(e); process.exit(1); });
