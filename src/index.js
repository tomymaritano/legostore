import React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { createRoot } from "react-dom/client"; // Importa createRoot desde react-dom
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import theme from "./components/Config/theme";

const customTheme = extendTheme(theme);
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={customTheme}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
);
