import Board from 'components/Board';
import { Provider } from 'react-redux';
import React from 'react';
import { render } from 'react-dom';
import store from 'store';

render(
  <Provider store={store}>
    <Board />
  </Provider>,
  document.getElementById('board')
);
