import React from 'react';
import ReactDOM from 'react-dom';
import './custom.scss';
import App from './App';
import AuthContextProvider from './contexts/AuthContext';

ReactDOM.render(
    <AuthContextProvider>
      <App />
    </AuthContextProvider>,
  document.getElementById('root')
);
