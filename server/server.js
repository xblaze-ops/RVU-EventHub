const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


// ===============================
// USERS
// ===============================

const users = [
  {
    id: 1,
    name: "RVU Student",
    email: "student@rvu.edu.in",
    password: "student123",
    role: "student"
  },
  {
    id: 2,
    name: "Event Organizer",
    email: "organizer@rvu.edu.in",
    password: "admin123",
    role: "organizer"
  }
];


// ===============================
// EVENTS
// ===============================

let events = [
  {
    id: 1,
    title: "RVU Tech Fest 2026",
    category: "Technical",
    date: "2026-10-15",
    time: "10:00 AM",
    venue: "Admin Block Auditorium",
    organizer: "RV University",
    capacity: 200,
    registered: 85,
    description:
      "A technical festival featuring coding, innovation and technology events."
  },
  {
    id: 2,
    title: "ATLETA Sports Meet",
    category: "Sports",
    date: "2026-10-18",
    time: "2:00 PM",
    venue: "RV University Ground",
    organizer: "ATLETA Sports Club",
    capacity: 150,
    registered: 64,
    description:
      "An inter-team sports event promoting fitness, teamwork and sportsmanship."
  },
  {
    id: 3,
    title: "Cultural Night",
    category: "Cultural",
    date: "2026-10-22",
    time: "5:30 PM",
    venue: "Main Auditorium",
    organizer: "Student Affairs",
    capacity: 500,
    registered: 320,
    description:
      "An evening celebrating music, dance, art and student talent."
  },
  {
    id: 4,
    title: "Photography Workshop",
    category: "Workshop",
    date: "2026-10-25",
    time: "11:00 AM",
    venue: "B Block Seminar Hall",
    organizer: "Photography Club",
    capacity: 80,
    registered: 42,
    description:
      "A hands-on photography workshop covering composition and camera techniques."
  }
];


// ===============================
// REGISTRATIONS
// ===============================

let registrations = [];


// ===============================
// HOME / TEST ROUTE
// ===============================

app.get("/", (req, res) => {
  res.json({
    message: "RVU EventHub API is running"
  });
});


// ===============================
// LOGIN
// ===============================

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (item) =>
      item.email === email &&
      item.password === password
  );

  if (!user) {
    return res.status(401).json({
      message: "Invalid email or password"
    });
  }

  res.json({
    message: "Login successful",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
});


// ===============================
// GET ALL EVENTS
// ===============================

app.get("/api/events", (req, res) => {
  res.json(events);
});


// ===============================
// GET SINGLE EVENT
// ===============================

app.get("/api/events/:id", (req, res) => {
  const event = events.find(
    (event) => event.id === Number(req.params.id)
  );

  if (!event) {
    return res.status(404).json({
      message: "Event not found"
    });
  }

  res.json(event);
});


// ===============================
// CREATE EVENT
// ===============================

app.post("/api/events", (req, res) => {
  const {
    title,
    category,
    date,
    time,
    venue,
    organizer,
    capacity,
    description
  } = req.body;

  if (!title || !category || !date || !time || !venue) {
    return res.status(400).json({
      message: "Please fill all required fields"
    });
  }

  const newEvent = {
    id: Date.now(),
    title,
    category,
    date,
    time,
    venue,
    organizer: organizer || "RV University",
    capacity: Number(capacity) || 100,
    registered: 0,
    description: description || ""
  };

  events.push(newEvent);

  res.status(201).json(newEvent);
});


// ===============================
// EDIT EVENT
// ===============================

app.put("/api/events/:id", (req, res) => {
  const index = events.findIndex(
    (event) => event.id === Number(req.params.id)
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Event not found"
    });
  }

  events[index] = {
    ...events[index],
    ...req.body,
    id: events[index].id
  };

  res.json(events[index]);
});


// ===============================
// DELETE EVENT
// ===============================

app.delete("/api/events/:id", (req, res) => {
  const index = events.findIndex(
    (event) => event.id === Number(req.params.id)
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Event not found"
    });
  }

  events.splice(index, 1);

  res.json({
    message: "Event deleted successfully"
  });
});


// ===============================
// REGISTER FOR EVENT
// ===============================

app.post("/api/registrations", (req, res) => {
  const { eventId, name, email, phone } = req.body;

  const event = events.find(
    (event) => event.id === Number(eventId)
  );

  if (!event) {
    return res.status(404).json({
      message: "Event not found"
    });
  }

  if (event.registered >= event.capacity) {
    return res.status(400).json({
      message: "This event is fully booked"
    });
  }

  const registration = {
    id: Date.now(),
    eventId: Number(eventId),
    name,
    email,
    phone,
    registeredAt: new Date().toISOString()
  };

  registrations.push(registration);

  event.registered++;

  res.status(201).json({
    message: "Registration successful",
    registration
  });
});


// ===============================
// GET REGISTRATIONS
// ===============================

app.get("/api/registrations", (req, res) => {
  res.json(registrations);
});


// ===============================
// DASHBOARD
// ===============================

app.get("/api/dashboard", (req, res) => {
  const totalEvents = events.length;

  const totalRegistrations = events.reduce(
    (sum, event) => sum + event.registered,
    0
  );

  const upcomingEvents = events.filter(
    (event) => new Date(event.date) >= new Date()
  ).length;

  const categories = [
    ...new Set(events.map((event) => event.category))
  ].length;

  res.json({
    totalEvents,
    totalRegistrations,
    upcomingEvents,
    categories
  });
});


// ===============================
// START SERVER
// ===============================

app.listen(PORT, () => {
  console.log(
    `RVU EventHub API running at http://localhost:${PORT}`
  );
});