import { createContext, useState } from "react";

export const CartContext = createContext({
  cart: [],
  wishlist: [],
});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // --- Cart totals --- //
  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.quantity * item.price, 0);
  const totalWishlistQuantity = wishlist.length;

  // --- Cart methods --- //
  const isInCart = (itemId) => cart.some((item) => item.id === itemId);

  const addItem = (item, quantity) => {
    setCart((prevCart) => {
      if (!isInCart(item.id)) {
        return [...prevCart, { ...item, quantity }];
      }
      return prevCart.map((prod) =>
        prod.id === item.id
          ? { ...prod, quantity: prod.quantity + quantity }
          : prod
      );
    });
  };

  const increaseQuantity = (itemId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (itemId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  // --- Wishlist methods --- //
  const isInWishlist = (itemId) => wishlist.some((item) => item.id === itemId);

  const addToWishlist = (item) => {
    setWishlist((prevWishlist) => {
      if (!isInWishlist(item.id)) {
        return [...prevWishlist, item];
      }
      return prevWishlist;
    });
  };

  const removeFromWishlist = (itemId) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((item) => item.id !== itemId)
    );
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <CartContext.Provider
      value={{
        // Cart
        cart,
        totalQuantity,
        totalPrice,
        addItem,
        removeItem,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
        isInCart,
        // Wishlist
        wishlist,
        totalWishlistQuantity,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};