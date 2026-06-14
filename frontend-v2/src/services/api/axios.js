// Axios library
import axios from "axios";

/*
  Central API instance

  All frontend requests
  will use this.
*/
const API = axios.create({

  baseURL: "/api",

  withCredentials: true
});

// Handle 401 Unauthorized globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // If the backend rejects the cookie, clear local user and redirect to login
      localStorage.removeItem("user");
      if (window.location.pathname !== "/login" && window.location.pathname !== "/") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default API;