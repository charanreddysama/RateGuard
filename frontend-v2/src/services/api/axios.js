// Axios library
import axios from "axios";

/*
  Central API instance

  All frontend requests
  will use this.
*/
const API = axios.create({

  baseURL:
    import.meta.env.VITE_API_URL || "http://localhost:5000/api",

  withCredentials: true
});

// Automatically attach token
API.interceptors.request.use(

  (config) => {

    const token =
      localStorage.getItem("token");

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  }
);

export default API;