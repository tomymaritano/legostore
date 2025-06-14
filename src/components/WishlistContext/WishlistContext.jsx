import { createContext, useReducer, useMemo, useCallback } from 'react';
import { wishlistReducer, initialWishlistState } from '../../reducers/wishlistReducer';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, dispatch] = useReducer(wishlistReducer, initialWishlistState);

  const totalWishlistQuantity = useMemo(() => wishlist.length, [wishlist]);

  const addToWishlist = useCallback((item) => dispatch({ type: 'ADD_ITEM', payload: item }), []);

  const removeFromWishlist = useCallback((id) => dispatch({ type: 'REMOVE_ITEM', payload: id }), []);

  const clearWishlist = useCallback(() => dispatch({ type: 'CLEAR_WISHLIST' }), []);

  const isInWishlist = useCallback((id) => wishlist.some((item) => item.id === id), [wishlist]);

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

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};
