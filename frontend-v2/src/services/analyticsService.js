import API from "./api/axios";

export const getAnalytics =
async (projectId) => {

  const response =
    await API.get(
      `/analytics/${projectId}`
    );

  return response.data;
};