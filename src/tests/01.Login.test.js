import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testa a Página de Login', ()=>{
  test('Verifica se é possível escrever nos campos nome e email.', ()=>{
    renderWithRouterAndRedux(<App />);

    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');

    userEvent.type(nameInput, 'Player Name');
    expect(nameInput.value).toBe('Player Name');

    userEvent.type(emailInput, 'player@email.com');
    expect(emailInput.value).toBe('player@email.com');    
  })

  test('Verifica se é o botão inicia desabilitado.', ()=>{
    renderWithRouterAndRedux(<App />);

    const playButton = screen.getByTestId('btn-play');
    expect(playButton.disabled).toBe(true);   
  })

  test('Verifica se é o botão habilita nas circuntâncias corretas.', ()=>{
    const initialState = {
      player: {
        name: 'Player Name',
        gravatarEmail: 'player@email.com',
        score: 0,
        assertions: 0,
      }
    }

    renderWithRouterAndRedux(<App />, initialState);

    const playButton = screen.getByTestId('btn-play');
    expect(playButton.disabled).toBe(true);   

    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');

    userEvent.type(nameInput, 'Juca');
    expect(playButton.disabled).toBe(true);

    userEvent.type(emailInput, 'emailErrado.com');
    expect(playButton.disabled).toBe(true);

    // emailInput.value ='';

    userEvent.type(emailInput, 'email@email.com');
    expect(playButton.disabled).toBe(false);  
    
    userEvent.type(nameInput, 'J');
    expect(playButton.disabled).toBe(true);

  })
})