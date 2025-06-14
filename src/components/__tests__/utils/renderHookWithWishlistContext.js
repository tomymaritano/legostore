// tests/utils/renderHookWithWishlistContext.js
import { renderHook } from '@testing-library/react-hooks';
import { WishlistProvider, WishlistContext } from '../../src/components/WishlistContext';
import { useContext } from 'react';

export const renderHookWithWishlistContext = () =>
  renderHook(() => useContext(WishlistContext), {
    wrapper: ({ children }) => <WishlistProvider>{children}</WishlistProvider>,
  });