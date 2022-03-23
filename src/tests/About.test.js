import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from '../RenderWithRouter';
import App from '../App';

test('A página contém as informações sobre a Pokédex', () => {
  renderWithRouter(<App />);

  userEvent.click(screen.getByRole('link', { name: /about/i }));

  const h2 = screen.getByRole('heading', { name: /About Pokédex/i, level: 2 });
  expect(h2).toBeInTheDocument();

  const p1 = screen.getByText(/Pokédex, a digital encyclopedia/i);
  expect(p1).toBeInTheDocument();

  const p2 = screen.getByText(/Pokémons by type, and see more/i);
  expect(p2).toBeInTheDocument();

  const { src } = screen.getByRole('img');
  expect(src).toEqual('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
