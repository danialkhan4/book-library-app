import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom'
import { AuthProvider } from './components/Auth';

import App from './components/App';

ReactDOM.render(
  //<React.StrictMode>
  <HashRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </HashRouter>,
    
  //</React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

