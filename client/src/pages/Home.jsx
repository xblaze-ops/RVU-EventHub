import { Link } from "react-router-dom";
import WelcomeBanner from "../components/WelcomeBanner";

function Home() {
  return (
    <div>
      <WelcomeBanner
        title="Discover. Register. Experience."
        subtitle="Your one-stop platform for discovering and registering for events at RV University."
      />

      <section className="home-content">
        <h2>Welcome to RVU EventHub</h2>

        <p>
          Discover technical, cultural, sports and workshop events
          happening across RV University.
        </p>

        <Link to="/events" className="primary-button">
          Explore Events
        </Link>
      </section>
    </div>
  );
}

export default Home;