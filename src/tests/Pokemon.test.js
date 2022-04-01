import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from '../RenderWithRouter';
import App from '../App';
import data from '../data';

test('Existe uma rota de detalhes para cada Pokémon', () => {
  const { history } = renderWithRouter(<App />);

  data.forEach(({ id }, verifiedIds) => {
    userEvent.click(screen.getByRole('link', { name: /More details/i }));
    expect(history.location.pathname).toEqual(`/pokemons/${id}`);

    userEvent.click(screen.getByRole('link', { name: /Home/i }));

    for (let howManyClicks = 0; howManyClicks < (verifiedIds + 1); howManyClicks += 1) {
      userEvent.click(screen.getByRole('button', { name: /Próximo pokémon/i }));
    }
  });
});

test('Os dados de todos os Pokémons são criados corretamente na página', () => {
  renderWithRouter(<App />);

  data.forEach((pokemon, index, { length }) => {
    const { name, type, averageWeight: { value, measurementUnit }, image } = pokemon;
    const { textContent: nameId } = screen.getByTestId('pokemon-name');
    const { textContent: typeId } = screen.getByTestId('pokemon-type');
    const { textContent: weightId } = screen.getByTestId('pokemon-weight');
    const img = screen.getByRole('img', { name: `${name} sprite` });

    expect(nameId).toEqual(name);
    expect(typeId).toEqual(type);
    expect(weightId).toEqual(`Average weight: ${value} ${measurementUnit}`);
    expect(img.alt).toEqual(`${name} sprite`);
    expect(img.src).toEqual(image);

    if (index < length) {
      userEvent.click(screen.getByRole('button', { name: /Próximo pokémon/i }));
    }
  });
});

test('Validando atributo "src" e "alt" da imagem ao favoritar o Pokémon', () => {
  renderWithRouter(<App />);

  userEvent.click(screen.getByRole('link', { name: /More details/i }));
  userEvent.click(screen.getByLabelText('Pokémon favoritado?'));
  const { src } = screen.getByRole('img', { name: /Pikachu is marked as favorite/ });

  expect(src).toEqual('http://localhost/star-icon.svg');
});
