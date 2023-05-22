import * as React from 'react'
import NavBar from "./components/Navbar";
import ItemListContainer from "./components/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer";
import { ChakraProvider, Container } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <NavBar />
      <ItemListContainer />
      <ItemDetailContainer />
    </ChakraProvider>
  );
}

export default App;
