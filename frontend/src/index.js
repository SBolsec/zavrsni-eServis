import React from 'react';
import ReactDOM from 'react-dom';
import './custom.scss';
import App from './App';
import AuthContextProvider from './contexts/AuthContext';

import { icons } from './assets/icons';

React.icons = icons;

ReactDOM.render(
    <AuthContextProvider>
      <App />
    </AuthContextProvider>,
  document.getElementById('root')
);
