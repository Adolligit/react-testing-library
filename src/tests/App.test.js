import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouter } from '../RenderWithRouter';

test('O topo da página possui os links: "Home", "About" e "Favorite pokémons"', () => {
  renderWithRouter(<App />);

  const home = screen.getByRole('link', { name: /home/i });
  const about = screen.getByRole('link', { name: /about/i });
  const favoritePokemons = screen.getByRole('link', { name: /favorite pokémons/i });

  expect(home).toBeInTheDocument();
  expect(about).toBeInTheDocument();
  expect(favoritePokemons).toBeInTheDocument();
});
