import { useEffect, useState } from "react";
import API from "../api";
import { useAuth } from "../context/AuthContext";

function MyRegistrations() {
  const { user } = useAuth();

  const [registrations, setRegistrations] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [registrationResponse, eventResponse] =
        await Promise.all([
          API.get("/registrations"),
          API.get("/events"),
        ]);

      setRegistrations(registrationResponse.data);
      setEvents(eventResponse.data);
    } catch (error) {
      console.error(
        "Unable to load registrations:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const myRegistrations = registrations.filter(
    (registration) =>
      registration.email === user?.email
  );

  const getEvent = (eventId) => {
    return events.find(
      (event) => event.id === eventId
    );
  };

  if (loading) {
    return (
      <div className="page">
        <h1>Loading registrations...</h1>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>My Registrations</h1>

      <p>
        View all the events you have registered for.
      </p>

      {myRegistrations.length === 0 ? (
        <div className="home-content">
          <h2>No registrations yet</h2>

          <p>
            You have not registered for any events.
            Browse the Events page to find an event.
          </p>
        </div>
      ) : (
        <div className="event-grid">
          {myRegistrations.map((registration) => {
            const event = getEvent(
              registration.eventId
            );

            return (
              <div
                key={registration.id}
                className="event-management-card"
              >
                <div className="event-card">

                  <span className="event-category">
                    {event?.category || "Event"}
                  </span>

                  <h3>
                    {event?.title ||
                      "Event unavailable"}
                  </h3>

                  <div className="event-info">
                    <span>
                      📅{" "}
                      {event?.date || "N/A"}
                    </span>

                    <span>
                      🕐{" "}
                      {event?.time || "N/A"}
                    </span>

                    <span>
                      📍{" "}
                      {event?.venue || "N/A"}
                    </span>

                    <span>
                      👤 Registered as:{" "}
                      {registration.name}
                    </span>

                    <span>
                      📧{" "}
                      {registration.email}
                    </span>

                    {registration.phone && (
                      <span>
                        📱{" "}
                        {registration.phone}
                      </span>
                    )}
                  </div>

                  <div className="seat-info">
                    ✅ Registration Confirmed
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MyRegistrations;