import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";
import EventCard from "../components/EventCard";
import { useAuth } from "../context/AuthContext";

function Events() {
  const { user } = useAuth();

  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await API.get("/events");
      setEvents(response.data);
    } catch (error) {
      console.error("Error loading events:", error);
      setError("Unable to load events.");
    }
  };

  const handleDelete = async (id, title) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${title}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      await API.delete(`/events/${id}`);

      setMessage("Event deleted successfully!");
      setError("");

      fetchEvents();

      setTimeout(() => {
        setMessage("");
      }, 2000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to delete event."
      );
    }
  };

  const categories = [
    "All",
    ...new Set(events.map((event) => event.category)),
  ];

  const filteredEvents = events.filter((event) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      event.title.toLowerCase().includes(searchText) ||
      event.venue.toLowerCase().includes(searchText) ||
      event.organizer.toLowerCase().includes(searchText);

    const matchesCategory =
      category === "All" ||
      event.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="page">
      <div className="events-header">
        <div>
          <h1>Upcoming Events</h1>

          <p>
            Find technical, cultural, sports and workshop
            events happening at RV University.
          </p>
        </div>

        {user?.role === "organizer" && (
          <Link
            to="/add-event"
            className="primary-button"
          >
            + Create Event
          </Link>
        )}
      </div>

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

      <div className="filters">
        <input
          type="text"
          placeholder="Search by event, venue or organizer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="event-grid">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div key={event.id} className="event-management-card">
              <EventCard event={event} />

              {user?.role === "organizer" && (
                <div className="event-actions">
                  <Link
                    to={`/edit-event/${event.id}`}
                    className="secondary-button"
                  >
                    ✏️ Edit
                  </Link>

                  <button
                    onClick={() =>
                      handleDelete(
                        event.id,
                        event.title
                      )
                    }
                    className="danger-button"
                  >
                    🗑️ Delete
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No events found.</p>
        )}
      </div>
    </div>
  );
}

export default Events;