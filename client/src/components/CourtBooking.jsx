import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaMapPin, FaStar, FaMinus, FaPlus, FaTimes, FaCalendarAlt, FaClock, FaUser } from 'react-icons/fa';

const CourtBooking = () => {
    const { venueId } = useParams();
    const navigate = useNavigate();

    // State for form inputs
    const [sport, setSport] = useState('Badminton');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [duration, setDuration] = useState(2);
    const [selectedCourts, setSelectedCourts] = useState([]);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [showCourtPicker, setShowCourtPicker] = useState(false);

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

    // Format date for display
    const formatDateForDisplay = (dateString) => {
        if (!dateString) return 'Select Date';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Court Booking</h1>
                            <p className="text-gray-600 mt-2">Book your preferred court and time slot</p>
                        </div>
                        <div className="text-right">
                            <div className="text-sm text-gray-500">Venue</div>
                            <div className="font-semibold text-gray-900">{venue.name}</div>
                        </div>
                    </div>

                    <div className="mt-4 flex items-center space-x-6 text-sm text-gray-600">
                        <div className="flex items-center">
                            <FaMapPin className="mr-2" />
                            <span>{venue.location}</span>
                        </div>
                        <div className="flex items-center">
                            <FaStar className="mr-2 text-yellow-400" />
                            <span>{venue.rating} ({venue.totalReviews} reviews)</span>
                        </div>
                    </div>
                </div>

                {/* Booking Form */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <form className="space-y-6">
                        {/* Sport Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Sport
                            </label>
                            <select
                                value={sport}
                                onChange={(e) => setSport(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                {Object.keys(venue.sports).map(sportName => (
                                    <option key={sportName} value={sportName}>
                                        {sportName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Date Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Date
                            </label>
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setShowDatePicker(!showDatePicker)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-left flex items-center justify-between"
                                >
                                    <span className={date ? 'text-gray-900' : 'text-gray-500'}>
                                        {formatDateForDisplay(date)}
                                    </span>
                                    <FaCalendarAlt className="text-gray-400" />
                                </button>

                                {showDatePicker && (
                                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 p-4">
                                        <div className="grid grid-cols-7 gap-1 mb-2">
                                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                                <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                                                    {day}
                                                </div>
                                            ))}
                                        </div>
                                        <div className="grid grid-cols-7 gap-1">
                                            {generateCalendarDays().map((day, index) => (
                                                <button
                                                    key={index}
                                                    type="button"
                                                    onClick={() => {
                                                        if (day && !day.isPast) {
                                                            setDate(day.dateString);
                                                            setShowDatePicker(false);
                                                        }
                                                    }}
                                                    disabled={!day || day.isPast}
                                                    className={`w-8 h-8 text-sm rounded-md flex items-center justify-center ${!day || day.isPast
                                                        ? 'text-gray-300 cursor-not-allowed'
                                                        : day.isSelected
                                                            ? 'bg-blue-500 text-white'
                                                            : day.isToday
                                                                ? 'bg-blue-100 text-blue-600'
                                                                : 'hover:bg-gray-100 text-gray-700'
                                                        }`}
                                                >
                                                    {day?.day || ''}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Start Time Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Start Time
                            </label>
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setShowTimePicker(!showTimePicker)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-left flex items-center justify-between"
                                >
                                    <span className={startTime ? 'text-gray-900' : 'text-gray-500'}>
                                        {startTime || 'Select Time'}
                                    </span>
                                    <FaClock className="text-gray-400" />
                                </button>

                                {showTimePicker && (
                                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
                                        {timeSlots.map(time => (
                                            <button
                                                key={time}
                                                type="button"
                                                onClick={() => {
                                                    setStartTime(time);
                                                    setShowTimePicker(false);
                                                }}
                                                disabled={!isTimeSlotAvailable(time)}
                                                className={`w-full px-3 py-2 text-left hover:bg-gray-100 ${!isTimeSlotAvailable(time)
                                                    ? 'text-gray-400 cursor-not-allowed'
                                                    : 'text-gray-700'
                                                    }`}
                                            >
                                                {time}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Duration Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Duration
                            </label>
                            <div className="flex items-center space-x-3">
                                <button
                                    type="button"
                                    onClick={() => handleDurationChange(-1)}
                                    className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                                >
                                    <FaMinus className="text-gray-600" />
                                </button>
                                <span className="text-lg font-medium text-gray-900 min-w-[60px] text-center">
                                    {duration} Hr.
                                </span>
                                <button
                                    type="button"
                                    onClick={() => handleDurationChange(1)}
                                    className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                                >
                                    <FaPlus className="text-gray-600" />
                                </button>
                            </div>
                        </div>

                        {/* Court Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Court
                            </label>
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setShowCourtPicker(!showCourtPicker)}
                                    disabled={!selectedSportData}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-left flex items-center justify-between disabled:bg-gray-100 disabled:cursor-not-allowed"
                                >
                                    <span className={selectedCourts.length > 0 ? 'text-gray-900' : 'text-gray-500'}>
                                        {selectedCourts.length > 0
                                            ? `${selectedCourts.length} court(s) selected`
                                            : '--Select Court--'
                                        }
                                    </span>
                                    <FaUser className="text-gray-400" />
                                </button>

                                {showCourtPicker && selectedSportData && (
                                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
                                        {selectedSportData.courts.map((courtName, index) => (
                                            <button
                                                key={index}
                                                type="button"
                                                onClick={() => {
                                                    const court = { id: index, name: courtName };
                                                    if (!selectedCourts.find(c => c.id === court.id)) {
                                                        setSelectedCourts(prev => [...prev, court]);
                                                    }
                                                    setShowCourtPicker(false);
                                                }}
                                                className="w-full px-3 py-2 text-left hover:bg-gray-100 text-gray-700"
                                            >
                                                {courtName}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Selected Courts Display */}
                            {selectedCourts.length > 0 && (
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {selectedCourts.map(court => (
                                        <div key={court.id} className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                            <span>{court.name}</span>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveCourt(court.id)}
                                                className="ml-2 text-blue-600 hover:text-blue-800"
                                            >
                                                <FaTimes className="text-xs" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Price Display */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-medium text-gray-900">Total Price:</span>
                                <span className="text-2xl font-bold text-green-600">₹{totalPrice.toLocaleString()}</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                                {selectedSportData && `₹${selectedSportData.pricePerHour}/hour × ${duration} hour(s) × ${selectedCourts.length} court(s)`}
                            </p>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="button"
                            onClick={handleBookingSubmit}
                            disabled={selectedCourts.length === 0 || !date || !startTime}
                            className="w-full bg-green-600 text-white py-3 px-6 rounded-md font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                        >
                            Continue to Payment - ₹{totalPrice.toLocaleString()}
                        </button>
                    </form>
                </div>
            </div>

            {/* Click outside to close dropdowns */}
            {(showDatePicker || showTimePicker || showCourtPicker) && (
                <div
                    className="fixed inset-0 z-0"
                    onClick={() => {
                        setShowDatePicker(false);
                        setShowTimePicker(false);
                        setShowCourtPicker(false);
                    }}
                />
            )}
        </div>
    )
}

export default CourtBooking