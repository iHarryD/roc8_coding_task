import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { FilterProvider } from "./contexts/FilterContext";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <FilterProvider>
      <App />
    </FilterProvider>
  </StrictMode>
);
