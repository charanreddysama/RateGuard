import API from "./api/axios";

// Register user
export const registerUser = async (data) => {

  const response = await API.post(
    "/auth/register",
    data
  );

  return response.data;
};

// Login user
export const loginUser = async (data) => {

  const response = await API.post(
    "/auth/login",
    data
  );

  return response.data;
};