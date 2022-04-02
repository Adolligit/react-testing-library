import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { renderWithRouter } from '../RenderWithRouter';
import App from '../App';

const SRC = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';

test('Parágrafos, títulos  e imagens são corretamente criados na página', () => {
  renderWithRouter(<App />);
  userEvent.click(screen.getByRole('link', { name: 'More details' }));
  screen.getByRole('heading', { name: 'Pikachu Details', level: 2 });
  screen.getByRole('heading', { name: 'Summary', level: 2 });
  screen.getByText(/with electricity to make them tender/i);
  screen.getByRole('heading', { name: /Game locations of/i, level: 2 });
  screen.getByLabelText('Pokémon favoritado?');
  const maps = screen.getAllByRole('img', { name: /Pikachu location/i });

  expect(maps.some(({ src }) => src === SRC)).toBeTruthy();
});
