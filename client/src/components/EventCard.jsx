import { Link } from "react-router-dom";

function EventCard({ event }) {
  const availableSeats = event.capacity - event.registered;

  return (
    <div className="event-card">
      <div className="event-category">
        {event.category}
      </div>

      <h3>{event.title}</h3>

      <p>{event.description}</p>

      <div className="event-info">
        <span>📅 {event.date}</span>
        <span>⏰ {event.time}</span>
        <span>📍 {event.venue}</span>
        <span>👤 {event.organizer}</span>
      </div>

      <div className="seat-info">
        <strong>{availableSeats}</strong> seats available
      </div>

      <Link
        to={`/events/${event.id}`}
        className="primary-button"
      >
        View Details
      </Link>
    </div>
  );
}

export default EventCard;