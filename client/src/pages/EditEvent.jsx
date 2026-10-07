import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api";

function EditEvent() {
  const { id } = useParams();
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

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const response = await API.get(`/events/${id}`);

      setFormData({
        title: response.data.title,
        description: response.data.description,
        date: response.data.date,
        time: response.data.time,
        venue: response.data.venue,
        category: response.data.category,
        organizer: response.data.organizer,
        capacity: response.data.capacity,
      });
    } catch (err) {
      setError("Unable to load event.");
    } finally {
      setLoading(false);
    }
  };

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
      await API.put(`/events/${id}`, {
        ...formData,
        capacity: Number(formData.capacity),
      });

      setMessage("Event updated successfully!");

      setTimeout(() => {
        navigate(`/events/${id}`);
      }, 1000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to update event."
      );
    }
  };

  if (loading) {
    return (
      <div className="page">
        <h1>Loading event...</h1>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="form-container">
        <h1>Edit Event</h1>

        <p>Update the event details below.</p>

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
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
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
              min="1"
              required
            />
          </div>

          <button
            type="submit"
            className="primary-button"
          >
            Update Event
          </button>

        </form>
      </div>
    </div>
  );
}

export default EditEvent;