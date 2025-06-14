import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { WishlistProvider, WishlistContext } from './WishlistContext';

const wrapper = ({ children }) => (
  <WishlistProvider>{children}</WishlistProvider>
);

test('adds items to wishlist without duplicates', () => {
  const { result } = renderHook(() => React.useContext(WishlistContext), { wrapper });
  act(() => {
    result.current.addToWishlist({ id: '1', name: 'Test' });
    result.current.addToWishlist({ id: '1', name: 'Test' });
  });
  expect(result.current.wishlist).toHaveLength(1);
  expect(result.current.totalWishlistQuantity).toBe(1);
  expect(result.current.isInWishlist('1')).toBe(true);
});

test('removes item from wishlist', () => {
  const { result } = renderHook(() => React.useContext(WishlistContext), { wrapper });
  act(() => {
    result.current.addToWishlist({ id: '1', name: 'Test' });
    result.current.removeFromWishlist('1');
  });
  expect(result.current.wishlist).toHaveLength(0);
});

test('clears wishlist', () => {
  const { result } = renderHook(() => React.useContext(WishlistContext), { wrapper });
  act(() => {
    result.current.addToWishlist({ id: '1', name: 'Test' });
    result.current.clearWishlist();
  });
  expect(result.current.wishlist).toHaveLength(0);
});

