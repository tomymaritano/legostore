// tests/utils/renderHookWithCartContext.js
import { renderHook } from '@testing-library/react-hooks';
import { CartProvider, CartContext } from '../../src/components/CartContext';
import { useContext } from 'react';

export const renderHookWithCartContext = () =>
  renderHook(() => useContext(CartContext), {
    wrapper: ({ children }) => <CartProvider>{children}</CartProvider>,
  });