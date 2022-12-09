import React from 'react';
import "./css/index.css";
import ReactDOM from 'react-dom/client';
import Home from './screens/Home';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Notfound from './screens/Notfound';
import About from './screens/About';
import Watch from './screens/Watch';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Switch>
      <Route
        exact
        path="/">
        <Home/>
      </Route>
      <Route
        exact
        path="/about">
        <About/>
      </Route>
      <Route
        exact
        path="/watch">
        <Watch/>
      </Route>
      <Route path="*">
        <Notfound/>
      </Route>
    </Switch>
  </BrowserRouter>
);