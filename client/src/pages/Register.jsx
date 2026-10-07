import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api";
import { useAuth } from "../context/AuthContext";

function Register() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await API.post("/registrations", {
        eventId: Number(id),
        name,
        email: user?.email || email,
        phone,
      });

      setMessage(
        response.data.message ||
          "Registration successful!"
      );

      setTimeout(() => {
        navigate("/my-registrations");
      }, 1200);

    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="form-container">

        <h1>Event Registration</h1>

        <p>
          Register for this RVU EventHub event.
        </p>

        {message && (
          <div className="success-message">
            {message}
          </div>
        )}

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Full Name</label>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              required
            />
          </div>


          <div className="form-group">
            <label>Email Address</label>

            <input
              type="email"
              value={email}
              readOnly
              required
            />
          </div>


          <div className="form-group">
            <label>Phone Number</label>

            <input
              type="tel"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
              placeholder="Enter your phone number"
              required
            />
          </div>


          <button
            type="submit"
            className="primary-button"
            disabled={loading}
          >
            {loading
              ? "Registering..."
              : "Register for Event"}
          </button>

        </form>

      </div>
    </div>
  );
}

export default Register;