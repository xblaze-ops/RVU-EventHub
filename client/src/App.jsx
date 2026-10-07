import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import Register from "./pages/Register";
import MyRegistrations from "./pages/MyRegistrations";
import Dashboard from "./pages/Dashboard";
import AddEvent from "./pages/AddEvent";
import EditEvent from "./pages/EditEvent";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />

        <main>
          <Routes>

            {/* Public Pages */}

            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/events"
              element={<Events />}
            />

            <Route
              path="/events/:id"
              element={<EventDetails />}
            />

            <Route
              path="/login"
              element={<Login />}
            />


            {/* Logged-in User */}

            <Route
              path="/register/:id"
              element={
                <ProtectedRoute>
                  <Register />
                </ProtectedRoute>
              }
            />

            <Route
              path="/my-registrations"
              element={
                <ProtectedRoute>
                  <MyRegistrations />
                </ProtectedRoute>
              }
            />


            {/* Organizer Only */}

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute role="organizer">
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/add-event"
              element={
                <ProtectedRoute role="organizer">
                  <AddEvent />
                </ProtectedRoute>
              }
            />

            <Route
              path="/edit-event/:id"
              element={
                <ProtectedRoute role="organizer">
                  <EditEvent />
                </ProtectedRoute>
              }
            />

          </Routes>
        </main>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;