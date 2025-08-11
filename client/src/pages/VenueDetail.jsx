import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './VenueDetail.css'
import Footer from '../components/Footer'

const VenueDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [venue, setVenue] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [showAllPhotos, setShowAllPhotos] = useState(false)

  console.log('Venue ID: ', id)

  // Mock venue data - replace with actual API call
  const mockVenue = {
    id: parseInt(id) || 1,
    name: 'Central Sports Complex',
    description:
      'A premier multi-sport facility located in the heart of Bandra West, Mumbai, offering world-class amenities and professional-grade equipment for athletes of all levels.',
    address: '123 Sports Avenue, Bandra West, Mumbai, Maharashtra 400050',
    sports: [
      {
        name: 'Basketball',
        pricePerHour: 1500,
        available: true,
        description:
          'Professional basketball courts with NBA regulation dimensions'
      },
      {
        name: 'Volleyball',
        pricePerHour: 1500,
        available: true,
        description: 'Indoor volleyball courts with adjustable net heights'
      },
      {
        name: 'Badminton',
        pricePerHour: 1200,
        available: true,
        description: 'Multiple badminton courts with proper lighting'
      }
    ],
    amenities: [
      'Air Conditioning',
      'Professional Lighting',
      'Locker Rooms',
      'Shower Facilities',
      'Equipment Rental',
      'Free WiFi',
      'Parking Available',
      'Vending Machines',
      'First Aid Station',
      'Security Cameras'
    ],
    about:
      "Central Sports Complex has been serving the Mumbai community for over 15 years, providing top-quality sports facilities for both recreational and competitive athletes. Our facility features state-of-the-art equipment, professional staff, and a commitment to maintaining the highest standards of cleanliness and safety. Whether you're a beginner looking to try a new sport or a seasoned athlete preparing for competition, we have everything you need to excel.",
    photos: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop'
    ],
    rating: 4.5,
    totalReviews: 127,
    reviews: [
      {
        id: 1,
        user: 'John D.',
        rating: 5,
        date: '2024-01-15',
        comment:
          'Excellent facility! The basketball courts are in perfect condition and the staff is very friendly. Highly recommend!'
      },
      {
        id: 2,
        user: 'Sarah M.',
        rating: 4,
        date: '2024-01-10',
        comment:
          'Great place for volleyball practice. The courts are well-maintained and the lighting is perfect for evening games.'
      },
      {
        id: 3,
        user: 'Mike R.',
        rating: 5,
        date: '2024-01-08',
        comment:
          "Been coming here for years. Clean facilities, good equipment, and reasonable prices. Can't ask for more!"
      }
    ],
    openingHours: {
      monday: '6:00 AM - 11:00 PM',
      tuesday: '6:00 AM - 11:00 PM',
      wednesday: '6:00 AM - 11:00 PM',
      thursday: '6:00 AM - 11:00 PM',
      friday: '6:00 AM - 11:00 PM',
      saturday: '7:00 AM - 10:00 PM',
      sunday: '7:00 AM - 10:00 PM'
    },
    contact: {
      phone: '+91 98765 43210',
      email: 'info@centralsportscomplex.com',
      website: 'www.centralsportscomplex.com'
    }
  }

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setVenue(mockVenue)
      setLoading(false)
    }, 1000)
  }, [id])

  const renderStars = rating => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className='star filled'>
          ★
        </span>
      )
    }

    if (hasHalfStar) {
      stars.push(
        <span key='half' className='star half'>
          ★
        </span>
      )
    }

    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className='star'>
          ☆
        </span>
      )
    }

    return stars
  }

  const handleBookNow = () => {
    // Implement booking functionality
    alert('Booking functionality will be implemented here!')
  }

  if (loading) {
    return (
      <div className='venue-detail-container'>
        <div className='loading'>Loading venue details...</div>
      </div>
    )
  }

  if (!venue) {
    return (
      <div className='venue-detail-container'>
        <div className='error'>Venue not found</div>
        <button onClick={() => navigate('/venues')} className='back-btn'>
          Back to Venues
        </button>
      </div>
    )
  }

  return (
    <div className='venue-detail-container'>
      <div className='p-4'>
        {/* Header */}
        <div className='venue-header'>
          <button onClick={() => navigate('/venues')} className='back-btn'>
            ← Back to Venues
          </button>
          <h1>{venue.name}</h1>
          <div className='venue-meta'>
            <div className='rating'>
              <div className='stars'>{renderStars(venue.rating)}</div>
              <span className='rating-text'>{venue.rating}/5</span>
              <span className='review-count'>
                ({venue.totalReviews} reviews)
              </span>
            </div>
            <div className='location'>
              <span className='location-icon'>📍</span>
              {venue.address}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className='venue-content'>
          {/* <div className='photo-gallery'>
            <div className='main-photo'>
              <img
                src={venue.photos[activeImageIndex]}
                alt={`${venue.name} - Photo ${activeImageIndex + 1}`}
              />
              <button
                className='view-all-photos'
                onClick={() => setShowAllPhotos(true)}
              >
                View All Photos
              </button>
            </div>
            <div className='photo-thumbnails'>
              {venue.photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`${venue.name} - Thumbnail ${index + 1}`}
                  className={index === activeImageIndex ? 'active' : ''}
                  onClick={() => setActiveImageIndex(index)}
                />
              ))}
            </div>
          </div> */}

          <div className='min-h-[50vh] flex'>
            <div className='w-[90%]'>img container</div>
            <div className='flex flex-col gap-4'>
              {/* button */}
              <div>
                <button className='border hover:cursor-pointer border-gray-400 rounded-md p-2 text-white bg-green-800'>
                  Book this venue
                </button>
              </div>
              {/* opening */}
              <div className='border border-gray-400 p-4 rounded-md'>
                <p>Operating Hours</p>
                <p>7:00 AM - 10:00 PM</p>
              </div>
              {/* address */}
              <div className='border border-gray-400 rounded-md'>
                <div className='p-4'>
                  <span>📍</span>
                  <span>Address</span>
                  <p>
                    2nd Floor, Aangan Banquet Hall Opp. Akruti Heights,
                    Satellite, Jodhpur Village, Ahmedabad, Gujarat - 380051
                  </p>
                </div>

                <hr />
                {/* map container */}
                <div className='h-32 p-4'>Gmap</div>
              </div>
            </div>
          </div>

          {/* Venue Info Grid */}
          <div className='mt-4 venue-info-grid'>
            {/* Sports Available */}
            <div className='info-section'>
              <h2>Sports Available</h2>
              <div className='sports-list'>
                {venue.sports.map((sport, index) => (
                  <div key={index} className='sport-item'>
                    <div className='sport-header'>
                      <h3>{sport.name}</h3>
                      <span className='price'>
                        Rs {sport.pricePerHour}/hour
                      </span>
                    </div>
                    <p className='sport-description'>{sport.description}</p>
                    <span
                      className={`availability ${
                        sport.available ? 'available' : 'unavailable'
                      }`}
                    >
                      {sport.available ? 'Available' : 'Unavailable'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className='info-section'>
              <h2>Amenities</h2>
              <div className='amenities-grid'>
                {venue.amenities.map((amenity, index) => (
                  <div key={index} className='amenity-item'>
                    <span className='amenity-icon'>✓</span>
                    {amenity}
                  </div>
                ))}
              </div>
            </div>

            {/* About Venue */}
            <div className='info-section'>
              <h2>About This Venue</h2>
              <p className='venue-description'>{venue.description}</p>
              <p className='venue-about'>{venue.about}</p>
            </div>

            {/* Opening Hours */}
            <div className='info-section'>
              <h2>Opening Hours</h2>
              <div className='opening-hours'>
                {Object.entries(venue.openingHours).map(([day, hours]) => (
                  <div key={day} className='day-hours'>
                    <span className='day'>
                      {day.charAt(0).toUpperCase() + day.slice(1)}
                    </span>
                    <span className='hours'>{hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className='info-section'>
              <h2>Contact Information</h2>
              <div className='contact-info'>
                <div className='contact-item'>
                  <span className='contact-icon'>📞</span>
                  <span>{venue.contact.phone}</span>
                </div>
                <div className='contact-item'>
                  <span className='contact-icon'>✉️</span>
                  <span>{venue.contact.email}</span>
                </div>
                <div className='contact-item'>
                  <span className='contact-icon'>🌐</span>
                  <a
                    href={`https://${venue.contact.website}`}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {venue.contact.website}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className='reviews-section'>
            <h2>Reviews</h2>
            <div className='reviews-summary'>
              <div className='overall-rating'>
                <div className='rating-number'>{venue.rating}</div>
                <div className='rating-stars'>{renderStars(venue.rating)}</div>
                <div className='total-reviews'>
                  {venue.totalReviews} reviews
                </div>
              </div>
            </div>

            <div className='reviews-list'>
              {venue.reviews.map(review => (
                <div key={review.id} className='review-item'>
                  <div className='review-header'>
                    <span className='reviewer-name'>{review.user}</span>
                    <div className='review-rating'>
                      {renderStars(review.rating)}
                    </div>
                    <span className='review-date'>
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className='review-comment'>{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Booking Section */}
        <div className='booking-section'>
          <div className='booking-info'>
            <h3>Ready to Book?</h3>
            <p>
              Starting from Rs{' '}
              {Math.min(...venue.sports.map(s => s.pricePerHour))}/hour
            </p>
          </div>
          <button onClick={handleBookNow} className='book-now-btn'>
            Book Now
          </button>
        </div>

        {/* Photo Gallery Modal */}
        {showAllPhotos && (
          <div className='photo-modal' onClick={() => setShowAllPhotos(false)}>
            <div className='modal-content' onClick={e => e.stopPropagation()}>
              <button
                className='close-modal'
                onClick={() => setShowAllPhotos(false)}
              >
                ×
              </button>
              <div className='modal-gallery'>
                {venue.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`${venue.name} - Photo ${index + 1}`}
                    className={index === activeImageIndex ? 'active' : ''}
                  />
                ))}
              </div>
              <div className='modal-thumbnails'>
                {venue.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`${venue.name} - Thumbnail ${index + 1}`}
                    className={index === activeImageIndex ? 'active' : ''}
                    onClick={() => setActiveImageIndex(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className='mt-4'>
        <Footer />
      </div>
    </div>
  )
}

export default VenueDetail
