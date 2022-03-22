import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('O topo da aplicação contém um conjunto fixo de links de navegação: "Home", "About" e "Favorite pokémons"', () => {
  render(<App />);
});
