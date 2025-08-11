import './VenueDetail.css'
import { useState } from 'react'
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import Footer from '../components/Footer'

const VenueDetail = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { id } = useParams()

  const venue = location.state?.venue;

  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [showAllPhotos, setShowAllPhotos] = useState(false)

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
    alert('Booking functionality will be implemented here!')
  }

  if (!venue) {
    return (
      <div className='venue-detail-container'>
        <div className='error'>Venue not found</div>
        <button onClick={() => navigate('/')} className='back-btn'>
          Back to Home
        </button>
      </div>
    )
  }

  return (
    <>
      <div className='venue-detail-container'>
        <div className='venue-header'>
          <button onClick={() => navigate('/')} className='back-btn'>
            ← Back to Home
          </button>
          <h1>{venue.name}</h1>
          <div className='venue-meta'>
            <div className='rating'>
              {/* <div className='stars'>{renderStars(venue.rating)}</div>
              <span className='rating-text'>{venue.rating}/5</span>
              <span className='review-count'>
                ({venue.totalReviews} reviews)
              </span> */}
            </div>
            <div className='location'>
              <span className='location-icon'>📍</span>
              {venue.address}
            </div>
          </div>
        </div>

        <div className='venue-content'>
          <div className='min-h-[50vh] w-full flex gap-2'>
            <div className='basis-2/3 relative border border-gray-400 rounded-md'>
              {activeImageIndex > 0 && (
                <button
                  onClick={() => setActiveImageIndex(prev => Math.max(prev - 1, 0))}
                  className='border bg-gray-50 absolute border-gray-300 p-4 rounded-full top-[50%] left-[1rem] z-10'
                  aria-label='Previous image'
                >
                  <FaChevronLeft />
                </button>
              )}

              {activeImageIndex < venue.images.length - 1 && (
                <button
                  onClick={() => setActiveImageIndex(prev => Math.min(prev + 1, venue.images.length - 1))}
                  className='border bg-gray-50 absolute top-[50%] right-[1rem] border-gray-300 p-4 rounded-full z-10'
                  aria-label='Next image'
                >
                  <FaChevronRight />
                </button>
              )}

              <div className='w-full h-full'>
                <img
                  className='h-full w-full rounded-md object-cover'
                  src={venue.images[activeImageIndex]}
                  alt={`The venue view ${activeImageIndex + 1}`}
                />
              </div>
            </div>

            <div className='basis-1/3 flex flex-col gap-4'>
              <div>
                <Link
                  to={`/booking/${venue._id}`}
                  state={{ venue }}
                  className='border hover:border-gray-400 rounded-md p-2 text-white bg-green-800'
                >
                  Book this venue
                </Link>
              </div>
              <div className='info-section'>
                <p>Operating Hours</p>
                <p>7:00 AM - 10:00 PM</p>
              </div>
              <div className='info-section'>
                <div className='p-4 border-b-2 border-[#ecf0f1]'>
                  <span>📍</span>
                  <span>Address</span>
                  <p>
                    2nd Floor, Aangan Banquet Hall Opp. Akruti Heights,
                    Satellite, Jodhpur Village, Ahmedabad, Gujarat - 380051
                  </p>
                </div>
                <div className='h-32 p-4'>Gmap</div>
              </div>
            </div>
          </div>

          <div className='mt-4 venue-info-grid'>
            <div className='info-section'>
              <h2>Sports Available</h2>
              <div className='sports-list'>
                {venue.courts.length > 0 && (
                  venue.courts.map((court, index) => (
                    <div key={index} className='sport-item'>
                      <div className='sport-header'>
                        <h3>{court.sport}</h3>
                        <span className='price'>
                          ₹{court.price}/hour
                        </span>
                      </div>
                      <p className='sport-description'>{court.description}</p>
                      <span
                        className={`availability ${court.available ? 'available' : 'unavailable'
                          }`}
                      >
                        {court.available ? 'Available' : 'Unavailable'}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

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

            <div className='info-section'>
              <h2>About This Venue</h2>
              <p className='venue-description'>{venue.description}</p>
              <p className='venue-about'>{venue.about}</p>
            </div>

            <div className='info-section'>
              <h2>Opening Hours</h2>
              <div className='opening-hours'>
                {/* {Object.entries(venue.openingHours).map(([day, hours]) => (
                  <div key={day} className='day-hours'>
                    <span className='day'>
                      {day.charAt(0).toUpperCase() + day.slice(1)}
                    </span>
                    <span className='hours'>{hours}</span>
                  </div>
                ))} */}
              </div>
            </div>

            <div className='info-section'>
              <h2>Contact Information</h2>
              <div className='contact-info'>
                {/* <div className='contact-item'>
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
                </div> */}
              </div>
            </div>
          </div>

          <div className='reviews-section'>
            <h2>Reviews</h2>
            <div className='reviews-summary'>
              <div className='overall-rating'>
                {/* <div className='rating-number'>{venue.rating}</div>
                <div className='rating-stars'>{renderStars(venue.rating)}</div>
                <div className='total-reviews'>
                  {venue.totalReviews} reviews
                </div> */}
              </div>
            </div>

            <div className='reviews-list'>
              {/* {venue.reviews.map(review => (
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
              ))} */}
            </div>
          </div>
        </div>

        {venue.courts.length > 0 && (
          <div className='booking-section'>
            <div className='booking-info'>
              <h3>Ready to Book?</h3>
              <p>
                Starting from ₹
                {Math.min(...venue.courts.map(s => s.price))}/hour
              </p>
            </div>
            <Link
              to={`/booking/${venue._id}`}
              state={{ venue }}
              className='book-now-btn'
            >
              Book Now
            </Link>
          </div>
        )}

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
                {venue.images.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`${venue.name} - Photo ${index + 1}`}
                    className={index === activeImageIndex ? 'active' : ''}
                  />
                ))}
              </div>
              <div className='modal-thumbnails'>
                {venue.images.map((photo, index) => (
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
    </>
  )
}

export default VenueDetail

// const mockVenue = {
//   id: parseInt(id) || 1,
//   name: 'Central Sports Complex',
//   description:
//     'A premier multi-sport facility located in the heart of Bandra West, Mumbai, offering world-class amenities and professional-grade equipment for athletes of all levels.',
//   address: '123 Sports Avenue, Bandra West, Mumbai, Maharashtra 400050',
//   sports: [
//     {
//       name: 'Basketball',
//       pricePerHour: 1500,
//       available: true,
//       description:
//         'Professional basketball courts with NBA regulation dimensions'
//     },
//     {
//       name: 'Volleyball',
//       pricePerHour: 1500,
//       available: true,
//       description: 'Indoor volleyball courts with adjustable net heights'
//     },
//     {
//       name: 'Badminton',
//       pricePerHour: 1200,
//       available: true,
//       description: 'Multiple badminton courts with proper lighting'
//     }
//   ],
//   amenities: [
//     'Air Conditioning',
//     'Professional Lighting',
//     'Locker Rooms',
//     'Shower Facilities',
//     'Equipment Rental',
//     'Free WiFi',
//     'Parking Available',
//     'Vending Machines',
//     'First Aid Station',
//     'Security Cameras'
//   ],
//   about:
//     "Central Sports Complex has been serving the Mumbai community for over 15 years, providing top-quality sports facilities for both recreational and competitive athletes. Our facility features state-of-the-art equipment, professional staff, and a commitment to maintaining the highest standards of cleanliness and safety. Whether you're a beginner looking to try a new sport or a seasoned athlete preparing for competition, we have everything you need to excel.",
//   photos: [
//     'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
//     'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=600&fit=crop',
//     'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
//     'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=600&fit=crop',
//     'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop'
//   ],
//   rating: 4.5,
//   totalReviews: 127,
//   reviews: [
//     {
//       id: 1,
//       user: 'John D.',
//       rating: 5,
//       date: '2024-01-15',
//       comment:
//         'Excellent facility! The basketball courts are in perfect condition and the staff is very friendly. Highly recommend!'
//     },
//     {
//       id: 2,
//       user: 'Sarah M.',
//       rating: 4,
//       date: '2024-01-10',
//       comment:
//         'Great place for volleyball practice. The courts are well-maintained and the lighting is perfect for evening games.'
//     },
//     {
//       id: 3,
//       user: 'Mike R.',
//       rating: 5,
//       date: '2024-01-08',
//       comment:
//         "Been coming here for years. Clean facilities, good equipment, and reasonable prices. Can't ask for more!"
//     }
//   ],
//   openingHours: {
//     monday: '6:00 AM - 11:00 PM',
//     tuesday: '6:00 AM - 11:00 PM',
//     wednesday: '6:00 AM - 11:00 PM',
//     thursday: '6:00 AM - 11:00 PM',
//     friday: '6:00 AM - 11:00 PM',
//     saturday: '7:00 AM - 10:00 PM',
//     sunday: '7:00 AM - 10:00 PM'
//   },
//   contact: {
//     phone: '+91 98765 43210',
//     email: 'info@centralsportscomplex.com',
//     website: 'www.centralsportscomplex.com'
//   }
// }