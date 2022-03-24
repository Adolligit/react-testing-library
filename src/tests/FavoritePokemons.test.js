import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from '../RenderWithRouter';
import App from '../App';

describe('Validando interação com o favorito', () => {
  test('Não há card favorito, assim é exibida uma mensagem', () => {
    renderWithRouter(<App />);

    userEvent.click(screen.getByRole('link', { name: /Favorite Pokémons/i }));

    expect(screen.getByText(/No favorite pokemon found/i)).toBeInTheDocument();
  });

  test('É exibido todos os cards favoritos', () => {
    renderWithRouter(<App />);

    const namePokemon = screen.getByTestId('pokemon-name');
    console.log(namePokemon.value);

    userEvent.click(screen.getByRole('link', { name: /More details/i }));
    userEvent.click(screen.getByLabelText(/Pokémon favoritado/i));
    userEvent.click(screen.getByRole('link', { name: /Favorite Pokémons/i }));

    expect(screen.queryByText(/No favorite pokemon found/i)).toBeNull();
    expect(screen.getByTestId('pokemon-name')).toEqual(namePokemon);
  });
});
