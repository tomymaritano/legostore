import { createContext, useState } from "react";

export const CartContext = createContext({
  cart: [],
  wishlist: [],
});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  console.log(cart, wishlist);

  const totalQuantity = cart.reduce((acc, prod) => acc + prod.quantity, 0);
  const total = cart.reduce((acc, prod) => acc + prod.quantity * prod.price, 0);

  const totalWishlistQuantity = wishlist.length;

  // Cart methods
  const addItem = (item, quantity) => {
    if (!isInCart(item.id)) {
      setCart((prev) => [...prev, { ...item, quantity }]);
    } else {
      console.error("El producto ya fue agregado");
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
    const cartUpdated = cart.filter((prod) => prod.id !== itemId);
    setCart(cartUpdated);
  };

  const clearCart = () => {
    setCart([]);
  };

  const isInCart = (itemId) => {
    return cart.some((prod) => prod.id === itemId);
  };

  // Wishlist methods
  const addToWishlist = (item) => {
    if (!isInWishlist(item.id)) {
      setWishlist((prev) => [...prev, item]);
    } else {
      console.error("El producto ya está en Wishlist");
    }
  };

  

  const removeFromWishlist = (itemId) => {
    const wishlistUpdated = wishlist.filter((prod) => prod.id !== itemId);
    setWishlist(wishlistUpdated);
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
        wishlist,
        totalWishlistQuantity,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        increaseQuantity,
        decreaseQuantity
      }}
    >
      {children}
    </CartContext.Provider>
  );
};