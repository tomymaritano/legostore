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
  expect(result.current.totalQuantity).toBe(2);
  expect(result.current.totalPrice).toBe(20);
  expect(result.current.isInCart('1')).toBe(true);
});

test('updates item quantity', () => {
  const { result } = renderHook(() => React.useContext(CartContext), { wrapper });
  act(() => {
    result.current.addItem({ id: '1', name: 'Test', price: 10 }, 1);
    result.current.increaseQuantity('1');
    result.current.decreaseQuantity('1');
  });
  expect(result.current.cart[0].quantity).toBe(1);
});

test('removes item from cart', () => {
  const { result } = renderHook(() => React.useContext(CartContext), { wrapper });
  act(() => {
    result.current.addItem({ id: '1', name: 'Test', price: 10 }, 1);
    result.current.removeItem('1');
  });
  expect(result.current.cart).toHaveLength(0);
});

test('clears cart', () => {
  const { result } = renderHook(() => React.useContext(CartContext), { wrapper });
  act(() => {
    result.current.addItem({ id: '1', name: 'Test', price: 10 }, 1);
    result.current.clearCart();
  });
  expect(result.current.cart).toHaveLength(0);
});
