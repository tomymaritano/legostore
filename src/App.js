import * as React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";
import Cart from "./components/Cart/Cart";
import { CartProvider } from "./components/CartContext/CartContext";
import NotFound from "./components/NotFound/NotFound";
import Layout from "./components/Layout/Layout";
import Wishlist from "./components/Wishlist/Wishlist";
import SearchResults from "./components/SearchResults/SearchResults";
import ItemDetailPage from "./components/ItemDetail/ItemDetailPage";

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
          <Route path="/item/:productId" element={<ItemDetailPage />} /> {/* solo se usará si no hay modal */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route
            path="/item/:productId"
            element={
              <div style={{
                position: 'fixed',
                top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.6)', // overlay gris
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999, // muy alto
              }}>
                <ItemDetailContainer isModal />
              </div>
            }
          />
        </Routes>
      )}
    </>
  );
}

export default AppWrapper;