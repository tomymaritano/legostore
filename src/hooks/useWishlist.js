import { useContext } from 'react';
import { CartContext } from '../components/CartContext/CartContext';

export default function useWishlist() {
  const {
    wishlist,
    totalWishlistQuantity,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist,
  } = useContext(CartContext);

  return {
    wishlist,
    totalWishlistQuantity,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist,
  };
}
