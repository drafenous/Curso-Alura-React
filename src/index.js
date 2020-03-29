import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import Home from './Pages/Home/Home';
import Sobre from './Pages/Sobre/Sobre';
import Autores from './Pages/Autores/Autores';
import Livros from './Pages/Livros/Livros';
import NotFound from './Pages/NotFound/NotFound';

import {BrowserRouter, Switch, Route} from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path='/' exact={true} component={Home} />
      <Route path='/sobre' component={Sobre} />
      <Route path='/autores' component={Autores} />
      <Route path='/livros' component={Livros} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
