import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { renderWithRouter } from '../RenderWithRouter';
import App from '../App';
import data from '../data';
describe('Name of the group', () => {
  test('Existe uma rota para cada Pokémon de detalhes;', () => {
    const { history } = renderWithRouter(<App />);

    data.forEach(({ id }, i) => { // 0123
      userEvent.click(screen.getByRole('link', { name: /More details/i }));
      console.log(id);
      expect(history.location.pathname).toEqual(`/pokemons/${id}`);

      userEvent.click(screen.getByRole('link', { name: /Home/i }));
      for (let j = 0; j < (i + 1); j += 1) {
        userEvent.click(screen.getByRole('button', { name: /Próximo pokémon/i }));
      }
    });
  });
});