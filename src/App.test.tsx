import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const spanElement = getByText(/温馨提示/i);
  expect(spanElement).toBeInTheDocument();
});
