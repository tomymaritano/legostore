import * as React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";
import Cart from "./components/Cart/Cart";
import { CartProvider } from "./components/CartContext/CartContext";
import NotFound from "./components/NotFound/NotFound";
import Layout from "./components/Layout/Layout";
import Wishlist from "./components/Wishlist/Wishlist";

// Wrapper para poder usar useLocation
function AppWrapper() {
  return (
    <BrowserRouter>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </BrowserRouter>
  );
}
function AppContent() {
  const location = useLocation();
  const state = location.state;

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route element={<Layout />}>
          <Route path="/" element={<ItemListContainer />} />
          <Route path="/category/:categoryId" element={<ItemListContainer />} />
          <Route path="/item/:itemId" element={<ItemDetailContainer />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="*" element={<NotFound />} />
        </Route>
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
    </>
  );
}

export default AppWrapper;