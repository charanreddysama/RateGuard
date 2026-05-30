import Analytics
from "../models/Analytics.js";

export const trackAnalytics =
async ({
  projectId,
  route,
  identifier,
  algorithm,
  allowed
}) => {

  try {

    await Analytics.create({
      projectId,
      route,
      identifier,
      algorithm,
      allowed
    });

  } catch (error) {

    console.log(
      "Analytics Error:",
      error.message
    );
  }
};