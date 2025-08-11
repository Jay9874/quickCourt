import React from 'react'
import { useBookings } from '../hooks/useBookings'


export default function ProfileBooking() {

    const { bookings, loading, error, refetch } = useBookings();

    function fetchBookings(){
        console.log("Fetching bookings...");
        refetch();
    }
    return (
        <div>
            <div style={{ background: '#111', borderRadius: 16, border: '1.5px solid #333', padding: 18 }}>
                {
                    bookings.filter(b => b.status !== 'Cancelled').map((booking) => (
                        <div key={booking._id} style={{
                            background: '#181818',
                            borderRadius: 12,
                            padding: 18,
                            marginBottom: 16,
                            border: '1.5px solid #444',
                            boxShadow: '0 2px 8px #0003',
                        }}>
                            <div style={{ fontWeight: 600, fontSize: '1.05rem', marginBottom: 4 }}>
                                <span role="img" aria-label="court">🎾</span> {booking.venueName} ({booking.sport})
                            </div>
                            <div style={{ display: 'flex', gap: 18, fontSize: 15, marginBottom: 2 }}>
                                <span><span role="img" aria-label="date">📅</span> {booking.date}</span>
                                <span><span role="img" aria-label="time">⏰</span> {booking.startTime} - {booking.endTime}</span>
                            </div>
                            <div style={{ fontSize: 15, marginBottom: 2 }}>
                                <span role="img" aria-label="location">📍</span> {booking.location}
                            </div>
                            <div style={{ fontSize: 15, marginBottom: 2 }}>
                                Status: <span style={{ color: '#0f3', fontWeight: 600, marginLeft: 4 }}>
                                    <span role="img" aria-label="status">✅</span> {booking.status}
                                </span>
                            </div>
                            <div style={{ marginTop: 8, display: 'flex', gap: 12 }}>
                                {booking.status === 'Confirmed' && (
                                    <>
                                        <button
                                            style={{ color: '#f33', background: 'none', border: 'none', cursor: 'pointer', marginRight: 12, fontFamily: 'monospace', fontSize: 15 }}
                                            onClick={() => handleCancelBooking(booking._id)}
                                        >
                                            [Cancel Booking]
                                        </button>
                                        <button
                                            style={{ color: '#0f3', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'monospace', fontSize: 15 }}
                                            onClick={() => handleWriteReview(booking._id)}
                                        >
                                            [Write Review]
                                        </button>
                                    </>
                                )}
                                {booking.status === 'Confirmed' && !booking.canCancel && (
                                    <button style={{ color: '#0f3', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'monospace', fontSize: 15 }}>
                                        [Write Review]
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                }
            </div>
            <div>
                {
                    bookings.filter(b => b.status === 'Cancelled').map((booking) => (
                        <div key={booking._id} style={{
                            background: '#181818',
                            borderRadius: 12,
                            padding: 18,
                            marginBottom: 16,
                            border: '1px solid #333',
                        }}>
                            <div style={{ fontWeight: 600, fontSize: '1.05rem', marginBottom: 4 }}>
                                <span role="img" aria-label="court">🎾</span> {booking.venueName} ({booking.sport})
                            </div>
                            <div style={{ display: 'flex', gap: 18, fontSize: 15, marginBottom: 2 }}>
                                <span><span role="img" aria-label="date">📅</span> {booking.date}</span>
                                <span><span role="img" aria-label="time">⏰</span> {booking.startTime} - {booking.endTime}</span>
                            </div>
                            <div style={{ fontSize: 15, marginBottom: 2 }}>
                                <span role="img" aria-label="location">📍</span> {booking.location}
                            </div>
                            <div style={{ fontSize: 15, marginBottom: 2 }}>
                                Status: <span style={{ color: '#f33', fontWeight: 600 }}>
                                    <span role="img" aria-label="status">❌</span> {booking.status}
                                </span>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>

    )
}
