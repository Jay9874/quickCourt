import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaMapPin, FaStar, FaMinus, FaPlus, FaTimes } from 'react-icons/fa';
import DropdownSelect from '../components/DropdownSelect';
import '../components/DropdownSelect.css';
import './CourtBooking.css';

const CourtBooking = () => {
  const { venueId } = useParams();
  const navigate = useNavigate();
  
  // State for form inputs
  const [sport, setSport] = useState('Badminton');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [duration, setDuration] = useState(2);
  const [selectedCourts, setSelectedCourts] = useState([]);

  
  // Mock venue data - replace with actual API call
  const [venue, setVenue] = useState({
    id: venueId || 1,
    name: 'SBR Sports Complex',
    location: 'Satellite, Jodhpur Village',
    rating: 4.5,
    totalReviews: 6,
    sports: {
      'Badminton': { pricePerHour: 600, courts: ['Court 1', 'Court 2', 'Court 3', 'Court 4'] },
      'Tennis': { pricePerHour: 800, courts: ['Tennis Court 1', 'Tennis Court 2'] },
      'Basketball': { pricePerHour: 1000, courts: ['Basketball Court'] },
      'Volleyball': { pricePerHour: 700, courts: ['Volleyball Court 1', 'Volleyball Court 2'] },
      'Football': { pricePerHour: 1200, courts: ['Football Ground'] },
      'Cricket': { pricePerHour: 1500, courts: ['Cricket Ground'] },
      'Table Tennis': { pricePerHour: 400, courts: ['Table 1', 'Table 2', 'Table 3'] },
      'Squash': { pricePerHour: 900, courts: ['Squash Court 1', 'Squash Court 2'] },
      'Hockey': { pricePerHour: 1100, courts: ['Hockey Ground'] },
      'Baseball': { pricePerHour: 1000, courts: ['Baseball Field'] },
      'Rugby': { pricePerHour: 1300, courts: ['Rugby Ground'] },
      'Golf': { pricePerHour: 2000, courts: ['Golf Course'] }
    }
  });

  // Available time slots
  const timeSlots = [
    '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM',
    '07:00 PM', '08:00 PM', '09:00 PM', '10:00 PM'
  ];

  // Set default date to today
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setDate(formattedDate);
  }, []);

  // Clear selected courts when sport changes
  useEffect(() => {
    setSelectedCourts([]);
  }, [sport]);

  // Calculate total price based on selected sport
  const selectedSportData = venue.sports[sport];
  const totalPrice = selectedSportData ? selectedSportData.pricePerHour * duration * selectedCourts.length : 0;

  // Handle duration change
  const handleDurationChange = (change) => {
    const newDuration = Math.max(1, Math.min(4, duration + change));
    setDuration(newDuration);
  };

  // Handle court selection
  const handleCourtSelection = (court) => {
    if (selectedCourts.find(c => c.id === court.id)) {
      setSelectedCourts(prev => prev.filter(c => c.id !== court.id));
    } else {
      setSelectedCourts(prev => [...prev, court]);
    }
  };

  // Handle court removal
  const handleRemoveCourt = (courtId) => {
    setSelectedCourts(prev => prev.filter(c => c.id !== courtId));
  };

  // Check if time slot is available (mock logic)
  const isTimeSlotAvailable = (time) => {
    // Mock: some time slots are unavailable
    const unavailableSlots = ['07:00 AM', '03:00 PM'];
    return !unavailableSlots.includes(time);
  };

  // Handle booking submission
  const handleBookingSubmit = async () => {
    if (selectedCourts.length === 0) {
      alert('Please select at least one court');
      return;
    }

    if (!date || !startTime) {
      alert('Please select date and start time');
      return;
    }

    try {
      // Simulate API call for booking
      console.log('Creating booking:', {
        venueId: venue.id,
        sport,
        date,
        startTime,
        duration,
        courts: selectedCourts,
        totalPrice
      });

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Redirect to My Bookings page
      navigate('/profile/bookings');
    } catch (error) {
      console.error('Booking failed:', error);
      alert('Booking failed. Please try again.');
    }
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const isToday = dateString === new Date().toISOString().split('T')[0];
      const isSelected = dateString === date;
      const isPast = new Date(dateString) < new Date().setHours(0, 0, 0, 0);
      
      days.push({
        day,
        dateString,
        isToday,
        isSelected,
        isPast
      });
    }
    
    return days;
  };

  return (
    <div className="court-booking-container">
      <div className="booking-header">
        <div className="header-left">
          <span className="screen-indicator">screen 8</span>
          <h1>Venue Booking Page</h1>
          <div className="app-title">QUICKCOURT</div>
        </div>
        <div className="header-right">
          <div className="login-note">
            If not logged in first redirect to the login
            <span className="arrow">→</span>
          </div>
          <div className="user-info">
            <div className="user-avatar">👤</div>
            <span>Mitchell Admin</span>
          </div>
          <button className="book-button">
            <span>Book</span>
            <span className="checkmark">✓</span>
          </button>
        </div>
      </div>

      <div className="booking-main">
        <div className="booking-card">
          <div className="venue-info">
            <h2>Court Booking</h2>
            <div className="venue-details">
              <div className="venue-location">
                <FaMapPin />
                <span>{venue.location}</span>
              </div>
              <div className="venue-rating">
                <FaStar />
                <span>{venue.rating} ({venue.totalReviews})</span>
              </div>
            </div>
          </div>

          <form className="booking-form">
            {/* Sport Selection */}
            <div className="form-group">
              <DropdownSelect
                label="Sport"
                value={sport ? { label: sport, value: sport } : null}
                placeholder="Select sport"
                options={[
                  { label: 'Badminton', value: 'Badminton' },
                  { label: 'Tennis', value: 'Tennis' },
                  { label: 'Basketball', value: 'Basketball' },
                  { label: 'Volleyball', value: 'Volleyball' },
                  { label: 'Football', value: 'Football' },
                  { label: 'Cricket', value: 'Cricket' },
                  { label: 'Table Tennis', value: 'Table Tennis' },
                  { label: 'Squash', value: 'Squash' },
                  { label: 'Hockey', value: 'Hockey' },
                  { label: 'Baseball', value: 'Baseball' },
                  { label: 'Rugby', value: 'Rugby' },
                  { label: 'Golf', value: 'Golf' }
                ]}
                onSelect={(sportOption) => setSport(sportOption.value)}
                type="list"
                className="sport-dropdown"
              />
            </div>

            {/* Date Selection */}
            <div className="form-group">
              <DropdownSelect
                label="Date"
                value={date ? { label: date, dateString: date } : null}
                placeholder="Select date"
                options={generateCalendarDays()}
                onSelect={(day) => setDate(day.dateString)}
                type="calendar"
                className="date-dropdown"
              />
            </div>

            {/* Start Time Selection */}
            <div className="form-group">
              <DropdownSelect
                label="Start Time"
                value={startTime ? { label: startTime, value: startTime } : null}
                placeholder="Select time"
                options={timeSlots.map(time => ({
                  label: time,
                  value: time,
                  disabled: !isTimeSlotAvailable(time)
                }))}
                onSelect={(time) => setStartTime(time.value)}
                type="list"
                className="time-dropdown"
              />
            </div>

            {/* Duration Selection */}
            <div className="form-group">
              <label htmlFor="duration">Duration</label>
              <div className="duration-input">
                <button
                  type="button"
                  className="duration-btn minus"
                  onClick={() => handleDurationChange(-1)}
                >
                  <FaMinus />
                </button>
                <input
                  type="text"
                  id="duration"
                  value={`${duration} Hr.`}
                  readOnly
                  className="duration-display"
                />
                <button
                  type="button"
                  className="duration-btn plus"
                  onClick={() => handleDurationChange(1)}
                >
                  <FaPlus />
                </button>
              </div>
            </div>

            {/* Court Selection */}
            <div className="form-group">
              <DropdownSelect
                label="Court"
                value=""
                placeholder="--Select Court--"
                options={selectedSportData ? selectedSportData.courts.map((courtName, index) => ({
                  label: courtName,
                  value: index,
                  court: { id: index, name: courtName }
                })) : []}
                onSelect={(option) => {
                  if (!selectedCourts.find(c => c.id === option.court.id)) {
                    setSelectedCourts(prev => [...prev, option.court]);
                  }
                }}
                type="list"
                className="court-dropdown"
                disabled={!selectedSportData}
              />
              
              {/* Selected Courts Display */}
              {selectedCourts.length > 0 && (
                <div className="selected-courts">
                  {selectedCourts.map(court => (
                    <div key={court.id} className="court-tag">
                      <span>{court.name}</span>
                      <button
                        type="button"
                        className="remove-court"
                        onClick={() => handleRemoveCourt(court.id)}
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Continue to Payment Button */}
            <button
              type="button"
              className="payment-button"
              onClick={handleBookingSubmit}
              disabled={selectedCourts.length === 0 || !date || !startTime}
            >
              Continue to Payment - ₹{totalPrice.toLocaleString()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CourtBooking;
