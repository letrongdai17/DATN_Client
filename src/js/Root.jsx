/* eslint import/no-extraneous-dependencies: 0 */
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import './config';
import configureStore from './store/configureStore';
import SignIn from './containers/SignIn';
import PrivateRoute from './PrivateRoute';
import Home from './containers/Home';
import Lesson from './containers/Lesson';

const store = configureStore();

const Root = () => (
  <Provider store={store} key={Math.random()}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/signin" component={SignIn} />
          <Route path="/classes/:id/lessons" component={Lesson} />
          <PrivateRoute path="/" component={Home} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
);

export default Root;
