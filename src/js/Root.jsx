/* eslint import/no-extraneous-dependencies: 0 */
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import './config';
import configureStore from './store/configureStore';

const store = configureStore();

const Root = () => (
  <Provider store={store} key={Math.random()}>
    <BrowserRouter>
      <div>
        <Switch>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
);

export default Root;
