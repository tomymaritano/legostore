import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { createRoot } from "react-dom/client"; // Importa createRoot desde react-dom
import App from "./App";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
