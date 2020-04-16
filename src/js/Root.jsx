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
import LessonQRCode from './containers/LessonQRCode';
import RollUp from './containers/RollUp';
import { NotificationContainer } from 'react-notifications';

const store = configureStore();

const Root = () => (
  <Provider store={store} key={Math.random()}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/signin" component={SignIn} />
          <Route path="/classes/:id/lessons" component={Lesson} />
          <PrivateRoute path="/:lessonId/qr-code" component={LessonQRCode} />
          <PrivateRoute path="/:lessonId/roll-up" component={RollUp} />
          <PrivateRoute path="/" component={Home} />
        </Switch>
      </div>
    </BrowserRouter>
    <NotificationContainer />
  </Provider>
);

export default Root;
