import React from "react";
import ReactDOM from "react-dom/client";
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import "./stylecss/main.css";
import Background from "./components/Background";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Background />
  </React.StrictMode>
);
