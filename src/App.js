import * as React from "react";
import NavBar from "./components/Navbars/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";
import Cart from "./components/Cart/Cart";
import MainSlider from "./components/MainSlider/MainSlider";
import Footer from "./components/Footer/footer";
import ExtraNavbar from "./components/Navbars/ExtraNavbar";
import { CartProvider } from "./components/CartContext/CartContext";

function App() {
  return (
      <BrowserRouter>
        <CartProvider>
          <ExtraNavbar />
          <NavBar />
          <MainSlider />
          <Routes>
            <Route path="/" element={<ItemListContainer />} />
            <Route
              path="/category/:categoryId"
              element={<ItemListContainer />}
            />
            <Route path="/item/:itemId" element={<ItemDetailContainer />} />
            <Route path="/cart" element={<Cart />}/>
            <Route path="*" element={<h1>404 NOT FOUND</h1>} />
          </Routes>
          <Footer />
        </CartProvider>
      </BrowserRouter>
  );
}

export default App;
