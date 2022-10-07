import * as React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders login pagina, die aanmelden toont als titel', () => {
  render(<App />);
  const aanmelden = screen.getByText(/Aanmelden/i);
  expect(aanmelden).toBeInTheDocument();
});