import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GlobalStyle } from './styles/global';
import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <GlobalStyle />
    <App />
  </StrictMode>
);
