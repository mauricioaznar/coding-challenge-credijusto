import React from 'react';
import { screen } from '@testing-library/react';
import App from './App';
import {render} from "./test-utils/render";

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Welcom/i);
  expect(linkElement).toBeInTheDocument();
});
