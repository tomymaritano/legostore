import { createContext, useReducer, useMemo, useCallback } from 'react';
import { cartReducer, initialCartState } from '../../reducers/cartReducer';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialCartState);

  const totalQuantity = useMemo(
    () => cart.reduce((acc, item) => acc + (Number(item.quantity) || 0), 0),
    [cart]
  );

  const totalPrice = useMemo(
    () =>
      cart.reduce(
        (acc, item) =>
          acc + (Number(item.quantity) || 0) * (Number(item.price) || 0),
        0
      ),
    [cart]
  );

  const addItem = useCallback(
    (item, quantity) =>
      dispatch({ type: 'ADD_ITEM', payload: { item, quantity } }),
    []
  );

  const removeItem = useCallback((id) => dispatch({ type: 'REMOVE_ITEM', payload: id }), []);

  const clearCart = useCallback(() => dispatch({ type: 'CLEAR_CART' }), []);

  const increaseQuantity = useCallback(
    (id) => dispatch({ type: 'INCREASE_QUANTITY', payload: id }),
    []
  );

  const decreaseQuantity = useCallback(
    (id) => dispatch({ type: 'DECREASE_QUANTITY', payload: id }),
    []
  );

  const isInCart = useCallback((id) => cart.some((item) => item.id === id), [cart]);

  const value = useMemo(
    () => ({
      cart,
      totalQuantity,
      totalPrice,
      addItem,
      removeItem,
      clearCart,
      increaseQuantity,
      decreaseQuantity,
      isInCart,
    }),
    [cart, totalQuantity, totalPrice, addItem, removeItem, clearCart, increaseQuantity, decreaseQuantity, isInCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
