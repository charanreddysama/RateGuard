import express from "express";

import {
  rateGuard
} from "@rateguard/sdk";

const app = express();

app.use(

  rateGuard({

    apiKey:
      "e0100f20-426b-4a2d-bb39-04f02f11929b"
  })
);

app.get(
  "/products",
  (req, res) => {

    res.json({
      message:
        "Products API"
    });
  }
);

app.listen(
  3000,
  () => {

    console.log(
      "Server running on 3000"
    );
  }
);