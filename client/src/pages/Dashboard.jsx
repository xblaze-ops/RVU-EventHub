import { useEffect, useState } from "react";
import API from "../api";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await API.get("/dashboard");
      setStats(response.data);
    } catch (error) {
      console.error("Error loading dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="page">Loading dashboard...</div>;
  }

  if (!stats) {
    return (
      <div className="page">
        <h1>Dashboard</h1>
        <p>Unable to load dashboard data.</p>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Event Dashboard</h1>

      <p>
        Overview of events and registrations at RV University.
      </p>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Total Events</h3>
          <div className="number">{stats.totalEvents}</div>
        </div>

        <div className="dashboard-card">
          <h3>Total Registrations</h3>
          <div className="number">
            {stats.totalRegistrations}
          </div>
        </div>

        <div className="dashboard-card">
          <h3>Upcoming Events</h3>
          <div className="number">
            {stats.upcomingEvents}
          </div>
        </div>

        <div className="dashboard-card">
          <h3>Categories</h3>
          <div className="number">
            {stats.categories}
          </div>
        </div>
      </div>

      <div className="home-content">
        <h2>Event Management Overview</h2>

        <p>
          RVU EventHub provides a centralized platform for
          discovering events, managing registrations and
          monitoring event activity.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;