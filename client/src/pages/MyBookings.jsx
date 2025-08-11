import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapPin, FaCalendarAlt, FaClock, FaStar } from 'react-icons/fa';
import './MyBookings.css';

const MyBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock bookings data - replace with actual API call
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockBookings = [
        {
          id: 1,
          venueName: 'SBR Badminton',
          location: 'Satellite, Jodhpur Village',
          sport: 'Badminton',
          date: '2025-01-15',
          startTime: '02:00 PM',
          duration: 2,
          courts: ['Table 1', 'Table 2'],
          totalPrice: 2400,
          status: 'confirmed',
          rating: 4.5
        },
        {
          id: 2,
          venueName: 'Central Sports Complex',
          location: 'Bandra West, Mumbai',
          sport: 'Basketball',
          date: '2025-01-10',
          startTime: '06:00 PM',
          duration: 1,
          courts: ['Court A'],
          totalPrice: 1500,
          status: 'completed',
          rating: 5.0
        }
      ];
      setBookings(mockBookings);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-600 bg-green-100';
      case 'completed':
        return 'text-blue-600 bg-blue-100';
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmed';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return 'Pending';
    }
  };

  if (loading) {
    return (
      <div className="my-bookings-container">
        <div className="loading">Loading your bookings...</div>
      </div>
    );
  }

  return (
    <div className="my-bookings-container">
      <div className="bookings-header">
        <div className="header-left">
          <h1>My Bookings</h1>
          <p>View and manage your court bookings</p>
        </div>
        <button 
          className="back-button"
          onClick={() => navigate('/venues')}
        >
          ← Back to Venues
        </button>
      </div>

      {bookings.length === 0 ? (
        <div className="no-bookings">
          <div className="no-bookings-icon">📅</div>
          <h2>No Bookings Yet</h2>
          <p>You haven't made any court bookings yet.</p>
          <button 
            className="book-now-button"
            onClick={() => navigate('/venues')}
          >
            Book Your First Court
          </button>
        </div>
      ) : (
        <div className="bookings-list">
          {bookings.map((booking) => (
            <div key={booking.id} className="booking-card">
              <div className="booking-header-card">
                <div className="venue-info">
                  <h3>{booking.venueName}</h3>
                  <div className="venue-location">
                    <FaMapPin />
                    <span>{booking.location}</span>
                  </div>
                </div>
                <div className="booking-status">
                  <span className={`status-badge ${getStatusColor(booking.status)}`}>
                    {getStatusText(booking.status)}
                  </span>
                </div>
              </div>

              <div className="booking-details">
                <div className="detail-row">
                  <div className="detail-item">
                    <FaCalendarAlt />
                    <span>Date: {new Date(booking.date).toLocaleDateString()}</span>
                  </div>
                  <div className="detail-item">
                    <FaClock />
                    <span>Time: {booking.startTime} ({booking.duration} hr)</span>
                  </div>
                </div>
                
                <div className="detail-row">
                  <div className="detail-item">
                    <span>Sport: {booking.sport}</span>
                  </div>
                  <div className="detail-item">
                    <span>Courts: {booking.courts.join(', ')}</span>
                  </div>
                </div>

                <div className="detail-row">
                  <div className="detail-item">
                    <span>Total: ₹{booking.totalPrice.toLocaleString()}</span>
                  </div>
                  {booking.rating && (
                    <div className="detail-item">
                      <FaStar />
                      <span>Rating: {booking.rating}/5</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="booking-actions">
                {booking.status === 'confirmed' && (
                  <button className="action-button cancel">
                    Cancel Booking
                  </button>
                )}
                {booking.status === 'completed' && (
                  <button className="action-button rate">
                    Rate Experience
                  </button>
                )}
                <button className="action-button details">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
