import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AppWrapper from "./AppWrapper";
import "./i18n";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AppWrapper>
    <App />
  </AppWrapper>
);
