import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from '../RenderWithRouter';

test('O topo da página possui os links: "Home", "About" e "Favorite pokémons"', () => {
  const { history } = renderWithRouter(<App />);

  const home = screen.getByRole('link', { name: /home/i });
  expect(home).toBeInTheDocument();
  userEvent.click(home);
  expect(history.location.pathname).toBe('/');

  const about = screen.getByRole('link', { name: /about/i });
  expect(about).toBeInTheDocument();
  userEvent.click(about);
  expect(history.location.pathname).toBe('/about');

  const favoritePokemons = screen.getByRole('link', { name: /favorite pokémons/i });
  expect(favoritePokemons).toBeInTheDocument();
  userEvent.click(favoritePokemons);
  expect(history.location.pathname).toBe('/favorites');
});
