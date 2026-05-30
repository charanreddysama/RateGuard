import React
from "react";

import ReactDOM
from "react-dom/client";

import App
from "./App";

import "./index.css";

import Providers
from "./app/providers";

import { Toaster }
from "react-hot-toast";

ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

    <Providers>

      <Toaster
  position="top-right"
/>

      <App />
      

    </Providers>

  </React.StrictMode>
);