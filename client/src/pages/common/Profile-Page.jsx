
import React, { useState } from "react";
import "./Profile-Page.css";
import useAuthStore from "../../store/authStore";
import axios from "axios";
import { useBookings } from "../../hooks/useBookings";


const ProfilePage = () => {
    const user = useAuthStore((state) => state.user);
    const setUser = useAuthStore((state) => state.setUser);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [phone, setPhone] = useState(user?.phone || "");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [tab, setTab] = useState("all");
    const { bookings, loading: bookingsLoading, error: bookingsError, refetch } = useBookings();

    // Cancel booking handler
    const handleCancelBooking = async (bookingId) => {
        if (!window.confirm("Are you sure you want to cancel this booking?")) return;
        try {
            await axios.put(
                `${import.meta.env.VITE_SERVER_URL}/api/bookings/${bookingId}/cancel`,
                {},
                { withCredentials: true }
            );
            refetch();
        } catch (err) {
            alert(err?.response?.data?.message || "Failed to cancel booking");
        }
    };

    // Write review placeholder
    const handleWriteReview = (bookingId) => {
        alert("Write Review for booking: " + bookingId);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        setError("");
        try {
            const res = await axios.put(
                `${import.meta.env.VITE_SERVER_URL}/api/auth/profile`,
                {
                    name,
                    email,
                    phone,
                    oldPassword: oldPassword || undefined,
                    newPassword: newPassword || undefined,
                },
                { withCredentials: true }
            );
            setUser(res.data.user);
            setMessage("Profile updated successfully!");
            setOldPassword("");
            setNewPassword("");
        } catch (err) {
            setError(
                err?.response?.data?.message || "Failed to update profile. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setName(user?.name || "");
        setEmail(user?.email || "");
        setPhone(user?.phone || "");
        setOldPassword("");
        setNewPassword("");
        setMessage("");
        setError("");
    };

    function onBookingClick() {
        refetch()
        console.log("All bookings clicked");
        setTab("all");
    }

    return (
        <div className="profile-page">
            {/* Navbar/Header */}
            <header className="profile-header">
                <div className="app-title">QUICKCOURT</div>
                <div className="nav-actions">
                    <button className="book-btn">Book</button>
                    <div className="user-dropdown">
                        {user?.name || "User"}
                        {/* Dropdown menu here */}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="profile-main">
                {/* Left Column */}
                <section className="profile-sidebar">
                    <div className="avatar"></div>
                    <div className="user-info">
                        <div className="user-name">{user?.name || "-"}</div>
                        <div className="user-phone">{user?.phone || "-"}</div>
                        <div className="user-email">{user?.email || "-"}</div>
                    </div>
                    <button
                        className={`edit-profile-btn${tab === "profile" ? " active" : ""}`}
                        onClick={() => setTab("profile")}
                        style={{ marginBottom: 8 }}
                    >
                        Edit Profile
                    </button>
                    <button
                        name="bookings"
                        className="Hello"
                        onClick={onBookingClick}
                        style={{ marginBottom: 0 }}
                    >
                        All Bookings
                    </button>
                </section>

                {/* Right Column */}
                <section className="profile-form-section">
                    {/* Tabs */}
                    <div style={{ display: 'flex', gap: 12, marginBottom: 18 }}>

                        <button
                            className={tab === "all" ? "all-bookings-btn active" : "all-bookings-btn"}
                            style={{ borderRadius: 8, padding: '8px 24px', fontWeight: 600 }}
                            onClick={onBookingClick}
                        >
                            All Bookings
                        </button>
                        <button
                            className={tab === "cancelled" ? "all-bookings-btn active" : "all-bookings-btn"}
                            style={{ borderRadius: 8, padding: '8px 24px', fontWeight: 600 }}
                            onClick={() => setTab("cancelled")}
                            type="button"
                        >
                            Cancelled
                        </button>
                    </div>

                    {/* Profile Form (only when Profile tab is active) */}

                    <form className="profile-form" onSubmit={handleSubmit} onReset={handleReset}>
                        <div className="avatar" style={{ margin: '0 auto 12px auto' }}></div>
                        <label>Full Name</label>
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label>Phone</label>
                        <input
                            type="text"
                            placeholder="Phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                        <label>Old Password</label>
                        <div className="password-input">
                            <input
                                type={showOldPassword ? "text" : "password"}
                                placeholder="Old Password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                            <span onClick={() => setShowOldPassword((v) => !v)}>
                                {showOldPassword ? "🙈" : "👁️"}
                            </span>
                        </div>
                        <label>New Password</label>
                        <div className="password-input">
                            <input
                                type={showNewPassword ? "text" : "password"}
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <span onClick={() => setShowNewPassword((v) => !v)}>
                                {showNewPassword ? "🙈" : "👁️"}
                            </span>
                        </div>
                        {message && <div style={{ color: "#0f3", marginTop: 4 }}>{message}</div>}
                        {error && <div style={{ color: "#f33", marginTop: 4 }}>{error}</div>}
                        <div className="form-actions">
                            <button type="reset" className="reset-btn" disabled={loading}>
                                Reset
                            </button>
                            <button type="submit" className="save-btn" disabled={loading}>
                                {loading ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </form>

                </section>
            </main>
        </div>
    );
};

export default ProfilePage;
