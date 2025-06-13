import { useContext } from 'react';
import { CartContext } from '../components/CartContext/CartContext';

export default function useCart() {
  const {
    cart,
    totalQuantity,
    totalPrice,
    addItem,
    removeItem,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
    isInCart,
  } = useContext(CartContext);

  return {
    cart,
    totalQuantity,
    totalPrice,
    addItem,
    removeItem,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
    isInCart,
  };
}

