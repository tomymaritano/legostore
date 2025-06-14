import { createContext, useState, useCallback, useMemo } from "react";

export const CartContext = createContext({
  cart: [],
  totalQuantity: 0,
  totalPrice: 0,
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  isInCart: () => false,
});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // --- Cart totals --- //
  const totalQuantity = useMemo(
    () => cart.reduce((acc, item) => acc + (Number(item.quantity) || 0), 0),
    [cart]
  );

  const totalPrice = useMemo(
    () =>
      cart.reduce(
        (acc, item) => acc + (Number(item.quantity) || 0) * (Number(item.price) || 0),
        0
      ),
    [cart]
  );

  // --- Cart methods --- //
  const isInCart = useCallback(
    (itemId) => cart.some((item) => item.id === itemId),
    [cart]
  );

  const addItem = useCallback((item, quantity) => {
    setCart((prevCart) => {
      if (!prevCart.some((p) => p.id === item.id)) {
        return [...prevCart, { ...item, quantity }];
      }
      return prevCart.map((prod) =>
        prod.id === item.id ? { ...prod, quantity: prod.quantity + quantity } : prod
      );
    });
  }, []);

  const increaseQuantity = useCallback((itemId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId
          ? {
              ...item,
              quantity: Math.max((Number(item.quantity) || 1) + 1, 1),
            }
          : item
      )
    );
  }, []);

  const decreaseQuantity = useCallback((itemId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId
          ? {
              ...item,
              quantity: Math.max((Number(item.quantity) || 1) - 1, 1),
            }
          : item
      )
    );
  }, []);

  const removeItem = useCallback((itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);


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

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};