import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test.utils';
import App from '../../App';

test('renders navbar link', () => {
  renderWithProviders(<App />);
  expect(screen.getByText(/Helmet/i)).toBeInTheDocument();
});