import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testa a Página de Feedback', ()=>{
  test('Existe imagem', ()=>{
    const { history } = renderWithRouterAndRedux(<App />);

    const { pathname } = history.location;
      expect(pathname).toBe('/feedback');
  })

  // test('Verifica se é o botão inicia desabilitado.', ()=>{
  //   renderWithRouterAndRedux(<App />);

  //   const playButton = screen.getByTestId('btn-play');
  //   expect(playButton.disabled).toBe(true);   
  // })

  // test('Verifica se é o botão habilita nas circuntâncias corretas.', ()=>{
    
  // });

  // test('', () =>{

  //   const {history} = renderWithRouterAndRedux(<App />);




  // });

  // test('fetchTokenThunk', () => {
  //   global.fetch = jest.fn().mockResolvedValue({JSON: async () => mockAPI });

  //   renderWithRouterAndRedux(<App />);

  // });
})