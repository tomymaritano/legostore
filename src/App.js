import * as React from "react";
import NavBar from "./components/Navbars/Navbar";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";
import Cart from "./components/Cart/Cart";
import { ChakraProvider } from "@chakra-ui/react";
import MainSlider from "./components/MainSlider/MainSlider";
import Footer from "./components/Footer/footer";
import ExtraNavbar from "./components/Navbars/ExtraNavbar";
import { CartProvider } from "./components/CartContext/CartContext";
import NotFound from "./components/NotFound/NotFound";

// Wrapper para poder usar useLocation
function AppWrapper() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </BrowserRouter>
    </ChakraProvider>
  );
}

function AppContent() {
  const location = useLocation();
  const state = location.state;

  return (
    <>
      <ExtraNavbar />
      <NavBar />
      <MainSlider />

      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<ItemListContainer />} />
        <Route path="/category/:categoryId" element={<ItemListContainer />} />
        <Route path="/item/:itemId" element={<ItemDetailContainer />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />  // 👈 aquí tu 404 PRO

      </Routes>

      {/* Modal Route */}
      {state?.backgroundLocation && (
        <Routes>
          <Route
            path="/item/:itemId"
            element={<ItemDetailContainer isModal />}
          />
        </Routes>
      )}

      <Footer />
    </>
  );
}

export default AppWrapper;