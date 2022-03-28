import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from '../RenderWithRouter';
import App from '../App';
import data from '../data';

describe('Certificação de elementos na página', () => {
  beforeEach(() => renderWithRouter(<App />));

  test('A página possui os títulos "Pokédex" e "Encountered pokémons"', () => {
    expect(screen.getByText('Encountered pokémons')).toBeInTheDocument();
    expect(screen.getByText('Pokédex')).toBeInTheDocument();
  });

  test('Existem os botões "All", "Próximo pokémon" e com os tipos dos pokémons', () => {
    data.forEach(({ type }) => {
      screen.getByRole('button', { name: type });
    });
    screen.getByRole('button', { name: /All/i });
    screen.getByRole('button', { name: /Próximo pokémon/i });
  });
});

describe('Cerficação de dados e interação com o botão "Próximo pokémon"', () => {
  beforeEach(() => renderWithRouter(<App />));

  test('Ao clicar em "Próximo pokémon", novos dados são visualizados', () => {
    let previousPokemon = null;

    for (let i = 0; i < data.length; i += 1) {
      const currentPokemon = screen.getByTestId('pokemon-name').textContent;

      expect(currentPokemon).not.toEqual(previousPokemon);

      if (previousPokemon !== currentPokemon) {
        previousPokemon = currentPokemon;
      } else {
        screen.getByText('Vai dar erro se sua lógica estiver errada!');
      }

      userEvent.click(screen.getByRole('button', { name: /Próximo pokémon/i }));
    }
  });

  test('Após o último Pokémon, o primeiro é exibido novamente', () => {
    const firstPokemon = data[0].name;

    for (let i = 0; i < data.length; i += 1) {
      userEvent.click(screen.getByRole('button', { name: /Próximo pokémon/i }));

      if (i === data.length - 1) {
        const currentPokemon = screen.getByTestId('pokemon-name').textContent;
        expect(currentPokemon).toEqual(firstPokemon);
      }
    }
  });
});
