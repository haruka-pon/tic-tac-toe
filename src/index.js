import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import { TicTacToe } from "./App";
import { CubeMaker } from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <TicTacToe />
    <CubeMaker />
  </StrictMode>
);