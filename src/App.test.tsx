import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders welcome text', () => {
  render(<App />);
  const linkElement = screen.getByText(
    /Hi! You can search most popular repositories here:/i,
  );
  expect(linkElement).toBeInTheDocument();
});
