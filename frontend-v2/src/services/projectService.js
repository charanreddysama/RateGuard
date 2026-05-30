

import API from "./api/axios";

// Create project
export const createProject = async (projectData) => {

  const response = await API.post(
    "/projects/create",
    projectData
  );

  return response.data;
};

// Get all projects
export const getProjects = async () => {

  const response = await API.get(
    "/projects/my-projects"
  );

  return response.data;
};

// Delete project
export const deleteProject = async (projectId) => {

  const response = await API.delete(
    `/projects/${projectId}`
  );

  return response.data;
};