import { createContext, useState } from "react";

export const CartContext = createContext({
  cart: [],
  wishlist: [],
});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Totales
  const totalQuantity = cart.reduce((acc, prod) => acc + prod.quantity, 0);
  const total = cart.reduce((acc, prod) => acc + prod.quantity * prod.price, 0);
  const totalWishlistQuantity = wishlist.length;

  // ---- Cart methods ---- //
  const addItem = (item, quantity) => {
    if (!isInCart(item.id)) {
      setCart((prev) => [...prev, { ...item, quantity }]);
    } else {
      // update quantity if already in cart
      setCart((prev) =>
        prev.map((prod) =>
          prod.id === item.id
            ? { ...prod, quantity: prod.quantity + quantity }
            : prod
        )
      );
    }
  };

  const increaseQuantity = (itemId) => {
    setCart((prev) =>
      prev.map((prod) =>
        prod.id === itemId
          ? { ...prod, quantity: prod.quantity + 1 }
          : prod
      )
    );
  };

  const decreaseQuantity = (itemId) => {
    setCart((prev) =>
      prev.map((prod) =>
        prod.id === itemId && prod.quantity > 1
          ? { ...prod, quantity: prod.quantity - 1 }
          : prod
      )
    );
  };

  const removeItem = (itemId) => {
    setCart((prev) => prev.filter((prod) => prod.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const isInCart = (itemId) => {
    return cart.some((prod) => prod.id === itemId);
  };

  // ---- Wishlist methods ---- //
  const addToWishlist = (item) => {
    if (!isInWishlist(item.id)) {
      setWishlist((prev) => [...prev, item]);
    }
  };

  const removeFromWishlist = (itemId) => {
    setWishlist((prev) => prev.filter((prod) => prod.id !== itemId));
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  const isInWishlist = (itemId) => {
    return wishlist.some((prod) => prod.id === itemId);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        totalQuantity,
        total,
        addItem,
        removeItem,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
        wishlist,
        totalWishlistQuantity,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};