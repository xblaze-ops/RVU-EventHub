import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">

      <Link to="/" className="logo">
        <img
          src="/rv-university-logo.png"
          alt="RV University"
          className="university-logo"
        />

        <span>EventHub</span>
      </Link>

      <div className="nav-links">

        <Link to="/">
          Home
        </Link>

        <Link to="/events">
          Events
        </Link>

        {isLoggedIn && (
          <Link to="/my-registrations">
            My Registrations
          </Link>
        )}

        {user?.role === "organizer" && (
          <>
            <Link to="/dashboard">
              Dashboard
            </Link>

            <Link to="/add-event">
              Create Event
            </Link>
          </>
        )}

        {!isLoggedIn ? (
          <Link to="/login">
            Login
          </Link>
        ) : (
          <>
            <span className="user-name">
              👤 {user.name}
            </span>

            <button
              onClick={handleLogout}
              className="logout-button"
            >
              Logout
            </button>
          </>
        )}

      </div>
    </nav>
  );
}

export default Navbar;