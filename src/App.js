import "./App.css";
import * as React from 'react'
import Navbar from "./components/Navbar";
// import ItemListContainer from "./components/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer";
import { ChakraProvider, Container } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <Navbar />
      <Container>
      <ItemDetailContainer />
      </Container>
    </ChakraProvider>
  );
}

export default App;
