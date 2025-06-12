import { render, screen } from '@testing-library/react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import App from '../../App';
import theme from './theme';

const customTheme = extendTheme(theme);

test('renders navbar link', () => {
  render(
    <ChakraProvider theme={customTheme}>
      <App />
    </ChakraProvider>
  );
  expect(screen.getByText(/Helmet/i)).toBeInTheDocument();
});
