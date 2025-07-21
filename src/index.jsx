import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const container = document.getElementById("root");
console.log("Root container:", container);
const root = createRoot(container);
root.render(<App />);
console.log("App rendered");
