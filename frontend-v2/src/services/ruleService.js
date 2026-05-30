import API from "./api/axios";

export const createRule =
async (data) => {

  const response =
    await API.post(
      "/rules/create",
      data
    );

  return response.data;
};

export const getProjectRules =
async (projectId) => {

  const response =
    await API.get(
      `/rules/project/${projectId}`
    );

  return response.data;
};

export const deleteRule =
async (ruleId) => {

  const response =
    await API.delete(
      `/rules/${ruleId}`
    );

  return response.data;
};