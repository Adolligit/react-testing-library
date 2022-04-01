import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from '../RenderWithRouter';
import App from '../App';
import data from '../data';

const POKEMON_NAME = 'pokemon-name'; // lint
const POKEMON_TYPE = 'pokemon-type'; // nojento

describe('Certificação de elementos na página', () => {
  beforeEach(() => renderWithRouter(<App />));

  test('A página possui os títulos "Pokédex" e "Encountered pokémons"', () => {
    expect(screen.getByText('Encountered pokémons')).toBeInTheDocument();
    expect(screen.getByText('Pokédex')).toBeInTheDocument();
  });

  test('Existem os botões "All", "Próximo pokémon" e com os tipos dos Pokémons', () => {
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
      const currentPokemon = screen.getByTestId(POKEMON_NAME).textContent;

      expect(currentPokemon).not.toEqual(previousPokemon);

      previousPokemon = currentPokemon;
      userEvent.click(screen.getByRole('button', { name: /Próximo pokémon/i }));
    }
  });

  test('Após o último Pokémon, o primeiro é exibido novamente', () => {
    const firstPokemon = data[0].name;

    for (let i = 0; i < data.length; i += 1) {
      userEvent.click(screen.getByRole('button', { name: /Próximo pokémon/i }));

      if (i === data.length - 1) {
        const currentPokemon = screen.getByTestId(POKEMON_NAME).textContent;

        expect(currentPokemon).toEqual(firstPokemon);
      }
    }
  });

  test('Respectivos Pokémons aparecem quando o botão com seu tipo é clicado', () => {
    const pokemonTypes = data.map(({ type }) => type);
    const allTypeButtons = screen.getAllByTestId('pokemon-type-button');

    allTypeButtons
      .forEach(({ textContent }) => (
        expect(pokemonTypes.includes(textContent)).toBeTruthy()
      ));

    const pokemonTypeFilter = data.reduce((acc, { type, name }) => (
      {
        ...acc,
        [type]: (acc[type]) ? [...acc[type], name] : [name],
      }), {});

    // Uso do Object.keys() por causa do lixo do lint. Preferia "for (let variavel in nomeDoObjeto)"
    Object.keys(pokemonTypeFilter).forEach((pokemonType) => {
      userEvent.click(screen.getByRole('button', { name: pokemonType }));
      expect(screen.getByRole('button', { name: /All/i })).toBeVisible();

      pokemonTypeFilter[pokemonType].forEach((pokemonName) => {
        const nextPokemon = screen.getByRole('button', { name: /Próximo pokémon/i });
        const { textContent } = screen.getByTestId(POKEMON_NAME);

        expect(textContent).toEqual(pokemonName);

        if (pokemonTypeFilter[pokemonType].length === 1) {
          expect(nextPokemon.disabled).toBeTruthy();
        } else {
          userEvent.click(nextPokemon);
        }
      });
    });
  });
});

describe('Interações com o botão "All"', () => {
  beforeEach(() => renderWithRouter(<App />));

  test('É possível percorrer por todos os Pokémons no início da aplicação', () => {
    const allPokemonsName = data.map(({ name }) => name);

    allPokemonsName.forEach((name) => {
      screen.getByText(name);
      userEvent.click(screen.getByRole('button', { name: /Próximo pokémon/i }));
    });
  });

  test('Pokémons de todos o tipos aparecem ao clicar no botão "All"', () => {
    const nextPokemon = screen.getByRole('button', { name: /Próximo pokémon/i });

    userEvent.click(screen.getByRole('button', { name: /Fire/i }));

    const fireType = screen.getByTestId(POKEMON_TYPE).textContent;

    userEvent.click(nextPokemon);
    expect(fireType).toEqual(screen.getByTestId(POKEMON_TYPE).textContent);

    userEvent.click(screen.getByRole('button', { name: /All/i }));
    expect(fireType).not.toEqual(screen.getByTestId(POKEMON_TYPE).textContent);
  });
});
