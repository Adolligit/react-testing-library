import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouter } from '../RenderWithRouter';

const IMAGE_SRC = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
const IMAGE_ALT = 'Pikachu crying because the page requested was not found';

test('A rota "Not Found" possui um h2 e uma imagem gif', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/404');

  screen.getByRole('heading', { name: /Page requested not found/i });
  const { src } = screen.getByRole('img', { name: IMAGE_ALT });
  expect(src).toEqual(IMAGE_SRC);
});
