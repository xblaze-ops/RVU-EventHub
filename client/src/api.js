import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((config) => {
  const user = localStorage.getItem("rvuUser");

  if (user) {
    const parsedUser = JSON.parse(user);

    config.headers["X-User-Role"] = parsedUser.role;
    config.headers["X-User-Email"] = parsedUser.email;
  }

  return config;
});

export default API;