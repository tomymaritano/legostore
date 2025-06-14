// src/test-utils.js
import { render } from '@testing-library/react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import theme from './components/Config/theme';

const customTheme = extendTheme(theme);

export function renderWithProviders(ui) {
  const queryClient = new QueryClient();

  return render(
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={customTheme}>{ui}</ChakraProvider>
    </QueryClientProvider>
  );
}