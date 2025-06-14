import { createContext, useState, useCallback, useMemo } from "react";

export const WishlistContext = createContext({
  wishlist: [],
  totalWishlistQuantity: 0,
  addToWishlist: () => {},
  removeFromWishlist: () => {},
  clearWishlist: () => {},
  isInWishlist: () => false,
});

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = useCallback((item) => {
    setWishlist((prev) => {
      if (prev.some((p) => p.id === item.id)) return prev;
      return [...prev, item];
    });
  }, []);

  const removeFromWishlist = useCallback((itemId) => {
    setWishlist((prev) => prev.filter((p) => p.id !== itemId));
  }, []);

  const clearWishlist = useCallback(() => {
    setWishlist([]);
  }, []);

  const isInWishlist = useCallback(
    (itemId) => wishlist.some((item) => item.id === itemId),
    [wishlist]
  );

  const totalWishlistQuantity = wishlist.length;

  const value = useMemo(
    () => ({
      wishlist,
      totalWishlistQuantity,
      addToWishlist,
      removeFromWishlist,
      clearWishlist,
      isInWishlist,
    }),
    [wishlist, totalWishlistQuantity, addToWishlist, removeFromWishlist, clearWishlist, isInWishlist]
  );

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  );
};
