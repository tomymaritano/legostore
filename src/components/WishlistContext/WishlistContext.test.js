import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { WishlistProvider, WishlistContext } from './WishlistContext';

const wrapper = ({ children }) => <WishlistProvider>{children}</WishlistProvider>;

test('adds item to wishlist', () => {
  const { result } = renderHook(() => React.useContext(WishlistContext), { wrapper });
  act(() => {
    result.current.addToWishlist({ id: '1', name: 'Test' });
  });
  expect(result.current.wishlist).toHaveLength(1);
});
