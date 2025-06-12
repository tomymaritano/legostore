import React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { createRoot } from "react-dom/client"; // Importa createRoot desde react-dom
import App from "./App";
import theme from "./components/Config/theme";

const customTheme = extendTheme(theme);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={customTheme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
