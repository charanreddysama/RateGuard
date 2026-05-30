import {
  DEFAULT_BASE_URL
} from "./constants.js";

export async function checkRateLimit({

  apiKey,
  route,
  identifier,
  baseUrl = DEFAULT_BASE_URL

}) {

  const response =
    await fetch(

      `${baseUrl}/limiter/check`,

      {
        method: "POST",

        headers: {

          "Content-Type":
            "application/json",

          "x-api-key":
            apiKey
        },

        body: JSON.stringify({

          route,
          identifier
        })
      }
    );

  return await response.json();
}