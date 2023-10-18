import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import CoolBackground from "./CoolBackground/index.tsx";
import { Analytics } from "@vercel/analytics/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CoolBackground />
    <App />
    <Analytics />
  </React.StrictMode>
);
