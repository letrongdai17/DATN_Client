import { fork } from 'redux-saga/effects';
import dummy from './dummy';
import auth from './auth';
import classes from './classes';

export default function* root() {
  yield fork(dummy);
  yield fork(auth);
  yield fork(classes);
}
