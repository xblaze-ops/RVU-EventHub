import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API from "../api";

function EventDetails() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const response = await API.get(`/events/${id}`);
      setEvent(response.data);
    } catch (error) {
      console.error("Error loading event:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="page">Loading event...</div>;
  }

  if (!event) {
    return (
      <div className="page">
        <h1>Event Not Found</h1>
        <Link to="/events" className="primary-button">
          Back to Events
        </Link>
      </div>
    );
  }

  const availableSeats = event.capacity - event.registered;

  return (
    <div className="page">
      <div className="details-card">
        <div className="event-category">
          {event.category}
        </div>

        <h1>{event.title}</h1>

        <p className="details-description">
          {event.description}
        </p>

        <div className="details-info">
          <div className="info-box">
            <strong>📅 Date</strong>
            {event.date}
          </div>

          <div className="info-box">
            <strong>⏰ Time</strong>
            {event.time}
          </div>

          <div className="info-box">
            <strong>📍 Venue</strong>
            {event.venue}
          </div>

          <div className="info-box">
            <strong>👤 Organizer</strong>
            {event.organizer}
          </div>

          <div className="info-box">
            <strong>🎟️ Capacity</strong>
            {event.capacity}
          </div>

          <div className="info-box">
            <strong>🪑 Available Seats</strong>
            {availableSeats}
          </div>
        </div>

        {availableSeats > 0 ? (
          <Link
            to={`/register/${event.id}`}
            className="primary-button"
          >
            Register for Event
          </Link>
        ) : (
          <p className="error-message">
            Registration is currently full.
          </p>
        )}

        <br />
        <br />

        <Link to="/events">
          ← Back to Events
        </Link>
      </div>
    </div>
  );
}

export default EventDetails;