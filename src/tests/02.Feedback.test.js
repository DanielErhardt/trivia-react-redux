import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testa a Página de Feedback', () => {
  test('Existe imagem com atributo `gravatar`', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/feedback');
    const { pathname } = history.location;

    expect(pathname).toBe('/feedback');
    const imgGravatar = screen.getByRole('img', { name: /gravatar/i });

    expect(imgGravatar).toBeInTheDocument();
    expect(imgGravatar).toHaveAttribute('alt', 'gravatar');
  })

  test('Existe imagem com atributo `gravatar`', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/feedback');
    const { pathname } = history.location;

    expect(pathname).toBe('/feedback');
    const playerName = screen.getByTestId('header-player-name');
    expect(playerName).toBeInTheDocument();
  });

  test('Existe imagem com atributo `gravatar`', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/feedback');
    const { pathname } = history.location;

    expect(pathname).toBe('/feedback');
    const playerName = screen.getByTestId('header-player-name');
    expect(playerName).toBeInTheDocument();
  });

  test('Verifica o score', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/feedback');
    const { pathname } = history.location;
    expect(pathname).toBe('/feedback');
    const score = screen.getByTestId('feedback-total-score');
    expect(score).toBeInTheDocument();
  })

  test('Verifica quantidade de corretas.', () => {
    const { history } = renderWithRouterAndRedux(<App />)
    history.push('/feedback');
    const total = screen.getByTestId('feedback-total-question');
    expect(total).toBeInTheDocument();
  });

  test('Testa texto do feedback', () => {
    const { history } = renderWithRouterAndRedux(<App />)
    history.push('/feedback');
    const feedbackText = screen.getByTestId('feedback-text');
    expect(feedbackText).toBeInTheDocument();
    global.fetch = jest.fn().mockResolvedValue({JSON: async () => mockAPI });

  });

  test('Se botão ranking redireciona para a `tela ranking`', () => {
    const { history } = renderWithRouterAndRedux(<App />)
    history.push('/feedback');
    const rankingButton = screen.getByRole('button', { name: /ranking/i });
    expect(rankingButton).toBeInTheDocument();
    userEvent.click(rankingButton);
    const { pathname } = history.location
    expect(pathname).toBe('/ranking');
  })
  test('Se botão PLay Again redireciona para a `tela inicial`', () => {
    const { history } = renderWithRouterAndRedux(<App />)
    history.push('/feedback');
    const playAgainButton = screen.getByRole('button', { name: /play again/i });
    expect(playAgainButton).toBeInTheDocument();
    userEvent.click(playAgainButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Se há um header', () => {
    const { history } = renderWithRouterAndRedux(<App />)
    history.push('/feedback');
    const header = screen.getByTestId('nosso-header')
    expect(header).toBeInTheDocument();
  });

});