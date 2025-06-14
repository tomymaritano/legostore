import { useContext } from 'react';
import { WishlistContext } from '../components/WishlistContext/WishlistContext';

export default function useWishlist() {
  const {
    wishlist,
    totalWishlistQuantity,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist,
  } = useContext(WishlistContext);

  return {
    wishlist,
    totalWishlistQuantity,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist,
  };
}
