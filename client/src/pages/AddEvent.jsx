import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function AddEvent() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    venue: "",
    category: "Technical",
    organizer: "",
    capacity: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      await API.post("/events", {
        ...formData,
        capacity: Number(formData.capacity),
      });

      setMessage("Event created successfully!");

      setTimeout(() => {
        navigate("/events");
      }, 1000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to create event."
      );
    }
  };

  return (
    <div className="page">
      <div className="form-container">
        <h1>Create New Event</h1>

        <p>Add a new event to RVU EventHub.</p>

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
            <label>Event Title</label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter event title"
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the event"
              required
            />
          </div>

          <div className="form-group">
            <label>Date</label>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Time</label>

            <input
              type="text"
              name="time"
              value={formData.time}
              onChange={handleChange}
              placeholder="Example: 10:00 AM"
              required
            />
          </div>

          <div className="form-group">
            <label>Venue</label>

            <input
              type="text"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              placeholder="Enter venue"
              required
            />
          </div>

          <div className="form-group">
            <label>Category</label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="Technical">Technical</option>
              <option value="Cultural">Cultural</option>
              <option value="Sports">Sports</option>
              <option value="Workshop">Workshop</option>
              <option value="Academic">Academic</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Organizer</label>

            <input
              type="text"
              name="organizer"
              value={formData.organizer}
              onChange={handleChange}
              placeholder="Enter organizer name"
              required
            />
          </div>

          <div className="form-group">
            <label>Maximum Capacity</label>

            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              placeholder="Example: 100"
              min="1"
              required
            />
          </div>

          <button
            type="submit"
            className="primary-button"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddEvent;