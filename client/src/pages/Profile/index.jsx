
import "./style.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import axios from "axios";

const ProfilePage = () => {
  const navigate = useNavigate();
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
          <button className="edit-profile-btn" disabled>
            Edit Profile
          </button>
        </section>

        {/* Right Column */}
        <section className="profile-form-section">
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
  )
}

export default ProfilePage