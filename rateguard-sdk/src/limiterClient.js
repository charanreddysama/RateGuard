

export async function checkRateLimit({

  apiKey,
  route,
  identifier

}) {

  const response =
    await fetch(

      "https://api.rateguard.com/api/limiter/check",

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

  return response.json();
}