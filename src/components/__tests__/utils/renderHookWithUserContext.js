// tests/utils/renderHookWithUserContext.js
import { renderHook } from '@testing-library/react-hooks';
import { UserProvider, UserContext } from '../../src/components/UserContext';
import { useContext } from 'react';

export const renderHookWithUserContext = () =>
  renderHook(() => useContext(UserContext), {
    wrapper: ({ children }) => <UserProvider>{children}</UserProvider>,
  });