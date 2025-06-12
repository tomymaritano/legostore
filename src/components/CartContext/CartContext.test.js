import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { CartProvider, CartContext } from './CartContext';

const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;

test('adds item to cart', () => {
  const { result } = renderHook(() => React.useContext(CartContext), { wrapper });
  act(() => {
    result.current.addItem({ id: '1', name: 'Test', price: 10 }, 2);
  });
  expect(result.current.cart).toHaveLength(1);
  expect(result.current.cart[0].quantity).toBe(2);
});
