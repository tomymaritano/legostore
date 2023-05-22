import * as React from "react";
import NavBar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ItemListContainer from "./components/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer";
import { ChakraProvider, Container } from "@chakra-ui/react";
import MainSlider from "./components/MainSlider";
import Footer from "./components/footer";
import ExtraNavbar from "./components/ExtraNavbar";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <ExtraNavbar />
        <NavBar />
        <MainSlider />
        <Routes>
          <Route path="/" element={<ItemListContainer />}/>
          <Route path="/category/:categoryId" element={<ItemListContainer />}/>
          <Route path="/item/:itemId" element={<ItemDetailContainer />}/>
          <Route path="*" element={<h1>404 NOT FOUND</h1>}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
